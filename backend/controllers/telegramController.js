import { GoogleGenerativeAI } from '@google/generative-ai'
import TelegramBot from 'node-telegram-bot-api'
import { orders } from '../data/Orders.js'
import { products } from '../data/Products.js'
import { catchAsync } from '../utils/catchAsync.js'

export const sendMessageTelegram = catchAsync(async (req, res, next) => {
  const token = process.env.BOT_TOKEN
  const bot = new TelegramBot(token)
  // const bot = new TelegramBot(token, { polling: true })

  await bot.sendMessage('1482349897', 'hello from the bot nodejs')
  res.json({ message: 'Message sent successfully' })
})

//!recieve messages here
export const recieveMessageTelegram = catchAsync(async (req, res, next) => {
  const SECRET_TOKEN = process.env.SECRET_TOKEN
  if (!SECRET_TOKEN) {
    return res.status(500).send('SECRET_TOKEN is wrong ')
  }

  const receivedToken = req.get('X-Telegram-Bot-Api-Secret-Token')
  if (receivedToken !== SECRET_TOKEN) {
    return res.status(403).send('Unauthorized')
  }

  const update = req.body

  // Check if the update contains a message
  if (update.message) {
    console.log(update)

    const receivedMessage = update.message.text
    const chatId = update.message.chat.id
    const userId = update.message.from.id
    console.log(`New message from chat ${chatId}: ${receivedMessage}`)
    const chatContent = [{ role: 'user', content: receivedMessage }]

    const message = await GenerateResponse(receivedMessage, chatContent)
    chatContent.push({ role: 'customer Service', content: message })
    const token = process.env.BOT_TOKEN
    const bot = new TelegramBot(token)
    bot.sendMessage(userId, message)
    res.status(200).json({ message: 'Message sent successfully' })
  } else {
    res.status(500).json({ message: 'Message not sent' })
  }
})

async function GenerateResponse(message, chatContent) {
  const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(
    `You are a customer service assistant for a business. Your tasks are to:
    dont repeat yourself and translate to the user's language just keep it darija of algerian
    1. Respond in the user's language. If the user speaks in English, answer in English. If they speak in Algerian Arabic (Darija), respond in Darija.
    2. Accurately detect the user's language and respond appropriately. If unclear, politely ask for clarification.
    3. Based on the user's input, provide concise and helpful responses. Prioritize clarity and professionalism.
    4. If the user asks about business hours, availability, or status, provide a relevant and direct response (e.g., "Yes, we are open" or "No, we are closed").
    5. If the user asks for discounts, offer available promotions or discounts, such as "Buy 3 or more products for 10% off" or any additional seller-specific offers.
    6. If the user asks a question outside of products and orders, politely explain: "I am only able to assist with products and orders."
    7. If the message is ambiguous or requires more details, politely ask the user for clarification.
    8. Ensure the response is brief, friendly, and context-aware.
    9. Incorporate the following chat context for a natural conversation flow: ${JSON.stringify(
      chatContent
    )}.
    
    User's message:
    "${message}"

    Context for your response:
    Products: ${JSON.stringify(products)}
    Orders: ${JSON.stringify(orders)}

    Discount offers:
    - Products that are eligible for discounts will offer 10% off when buying 3 or more.
    - Additional discounts may be applied depending on the seller's settings.

    Please make sure your response is:
    - Friendly, helpful, and clear.
    - Short, concise, and relevant to the user's request.
    - Appropriate for the user's language (either English or Darija).
    `
  )

  return result.response.text()
}

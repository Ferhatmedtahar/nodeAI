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

    const message = await GenerateResponse(receivedMessage)
    const token = process.env.BOT_TOKEN
    const bot = new TelegramBot(token)
    bot.sendMessage(userId, message)
    res.status(200).json({ message: 'Message sent successfully' })
  } else {
    res.status(500).json({ message: 'Message not sent' })
  }
})

async function GenerateResponse(message) {
  const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(
    `You are a multilingual customer service assistant for a business. Your task is to:

1. Detect the user's language based on their message and respond in the same language if possible. If you cannot determine the language, politely ask for clarification and specify the dialect (e.g., "Could you please specify whether you are using Algerian, Moroccan, or Tunisian Arabic?").
2. Analyze the user's message to understand their intent clearly, especially for North African dialects (Algerian, Moroccan, Tunisian). Use your Natural Language Processing (NLP) capabilities to interpret the meaning accurately.
3. Respond directly to the user's question or request in a concise and professional tone, using Algerian Arabic (Darija) if the user speaks it. Do not include translations or explanations unless explicitly asked.
4. If the user asks about business hours, availability, or status, provide a clear response relevant to the question (e.g., "Yes, we are open" or "No, we are closed").
5. If the user attempts to negotiate or asks for a discount, offer them special promotions or discounts available for bulk purchases. For example, "If you buy two of the **Stylish Backpack**, you can get a 5% discount on the total price." These offers are determined by the seller and can be customized based on the seller’s settings.
6. Keep your reply short, friendly, and helpful.
7. If the message is ambiguous or you need more details, politely ask the user to clarify.
8. Avoid generic or overly verbose responses unless explicitly asked.
9. Respond in Algerian Arabic (Darija) if the user speaks it if the user uses english then answer in english.
10. if the user ask about something that is not in the context then answer "I'm sorry, I'm responsible for products and orders only."

Here is the user's message:
"${message}"

Context for your response:
Products: ${JSON.stringify(products)}
Orders: ${JSON.stringify(orders)}

Discount offers available:
- Any product that accepts discounts will have 10% off if you buy 3 or more.
- Additional discounts can be applied depending on the seller's settings.

Your response should be:
- Friendly and conversational in Darija (Algerian Arabic).
- Accurate and helpful.
- In the user's language whenever possible.
- Brief and to the point.
- Respond in Darija if the user uses Algerian Arabic, without translation.`
  )
  return result.response.text()
}

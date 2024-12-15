import TelegramBot from 'node-telegram-bot-api'
import { catchAsync } from '../utils/catchAsync.js'

export const sendMessageTelegram = catchAsync(async (req, res, next) => {
  const token = '7564724974:AAFhfgoyI3nO1s8AvULHKsM3geiTtmQtPhY'
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
    const message = update.message.text
    const chatId = update.message.chat.id
    console.log(`New message from chat ${chatId}: ${message}`)
  }
  const token = '7564724974:AAFhfgoyI3nO1s8AvULHKsM3geiTtmQtPhY'
  const bot = new TelegramBot(token)
  bot.sendMessage(
    '1871583771',
    'hello akkadli serivce here : Ferhat , islam , ahmed , omar '
  )

  res.sendStatus(200)
  // const update = req.body
  //// Process incoming message
  // const chatId = '1482349897'
  // const messageText = update.message.text

  // // Do something (e.g., respond, save to database)
  // bot.sendMessage(chatId, 'You said: ' + messageText)
  // res.status(200).send('bee')
})

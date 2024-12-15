import TelegramBot from 'node-telegram-bot-api'
import { catchAsync } from '../utils/catchAsync.js'

export const sendMessageTelegram = catchAsync(async (req, res, next) => {
  const token = '7564724974:AAFhfgoyI3nO1s8AvULHKsM3geiTtmQtPhY'
  const bot = new TelegramBot(token, { polling: true })

  await bot.sendMessage('1482349897', '')
  res.json({ message: 'Message sent successfully' })
})

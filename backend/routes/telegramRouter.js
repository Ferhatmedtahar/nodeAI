import Express from 'express'
import { sendMessageTelegram } from '../controllers/telegramController.js'
const router = Express.Router()

router.get('/', sendMessageTelegram)

export default router

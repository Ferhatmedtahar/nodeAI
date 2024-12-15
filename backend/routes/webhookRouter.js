import Express from 'express'
import { recieveMessageTelegram } from '../controllers/telegramController.js'
const router = Express.Router()

router.post('/', recieveMessageTelegram)
export default router

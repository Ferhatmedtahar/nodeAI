import Express from 'express'
import aiRouter from './aiRouter.js'
import telegramRouter from './telegramRouter.js'
import webhookRouter from './webhookRouter.js'
const router = Express.Router()

router.use('/ai', aiRouter)
router.use('/telegram', telegramRouter)
router.use('/webhook', webhookRouter)

export default router

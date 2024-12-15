import Express from 'express'
import aiRouter from './aiRouter.js'
import telegramRouter from './telegramRouter.js'
const router = Express.Router()

router.use('/ai', aiRouter)
router.use('/telegram', telegramRouter)

export default router

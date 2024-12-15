import Express from 'express'
import aiRouter from './aiRouter.js'
const router = Express.Router()

router.use('/ai', aiRouter)

export default router

import Express from 'express'
import { getResponse } from '../controllers/aiController.js'
const router = Express.Router()

router.get('/', getResponse)

export default router

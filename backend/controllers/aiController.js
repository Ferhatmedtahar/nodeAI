import { GoogleGenerativeAI } from '@google/generative-ai'
import { catchAsync } from '../utils/catchAsync.js'
export const getResponse = catchAsync(async (req, res, next) => {
  const { question } = req.query
  console.log(question)
  const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(question)

  res.json({ message: result.response.text() })
})

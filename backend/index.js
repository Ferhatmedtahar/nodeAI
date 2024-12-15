import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import router from './routes/index.js'

const app = express()
const PORT = 5000

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})

// import OpenAI from 'openai'

// const openai = new OpenAI()
// const completion = await openai.chat.completions.create({
//   model: 'gpt-3.5-turbo', // Free model
//   messages: [
//     {
//       role: 'system',
//       content:
//         'You are an AI assistant, answer my questions to the best of your ability.',
//     },
//   ],
// })

// console.log(completion.choices[0].message.content)
//

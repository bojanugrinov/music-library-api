import express from 'express'
import cors from 'cors'
import router from './routes'

const PORT = 3000
const HOSTNAME = 'localhost'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () =>
  console.log(`Server is up and running. Listening on http://${HOSTNAME}:${PORT}`)
)

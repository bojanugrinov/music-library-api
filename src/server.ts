import express from 'express'
import router from './routes'

const PORT = 3000
const HOSTNAME = 'localhost'

const app = express()

app.use(express.json())

app.use('/api', router)

app.listen(PORT, () =>
  console.log(`Server is up and running. Listening on http://${HOSTNAME}:${PORT}`)
)

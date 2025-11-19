import { Router } from 'express'
import songRouter from '../modules/song/song.routes'

const router = Router()

router.use('/songs', songRouter)

export default router

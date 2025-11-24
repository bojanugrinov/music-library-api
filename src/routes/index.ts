import { Router } from 'express'
import artistRouter from '../modules/artist/artist.routes'
import songRouter from '../modules/song/song.routes'

const router = Router()

router.use('/artists', artistRouter)
router.use('/songs', songRouter)

export default router

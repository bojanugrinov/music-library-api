import { Router } from 'express'
import artistRouter from '../modules/artist/artist.routes'
import songRouter from '../modules/song/song.routes'
import playlistRouter from '../modules/playlist/playlist.routes'

const router = Router()

router.use('/artists', artistRouter)
router.use('/songs', songRouter)
router.use('/playlists', playlistRouter)

export default router

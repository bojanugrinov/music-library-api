import { Router } from 'express'
import * as songController from './song.controller'

const router = Router()

router.get('/', songController.getSongs)
router.get('/:id', songController.getSongById)
router.post('/', songController.createSong)
router.put('/:id', songController.updateSong)
router.delete('/:id', songController.deleteSong)

export default router

import { Router } from 'express'
import * as playlistController from './playlist.controller'

const router = Router()

router.get('/', playlistController.getPlaylists)
router.get('/:id', playlistController.getPlaylistById)
router.post('/', playlistController.createPlaylist)
router.post('/:id/songs', playlistController.addSongToPlaylist)
router.put('/:id', playlistController.updatePlaylist)
router.delete('/:id', playlistController.deletePlaylist)
router.delete('/:id/songs/:songId', playlistController.removeSongFromPlaylist)

export default router

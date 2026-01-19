import { Request, Response } from 'express'
import { ConflictError, NotFoundError, ValidationError } from '../../consts/errors'
import * as playlistService from './playlist.service'

export async function getPlaylists(_req: Request, res: Response) {
  try {
    const playlists = await playlistService.getPlaylists()
    res.json(playlists)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function getPlaylistById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const playlist = await playlistService.getPlaylistById(id)
    res.json(playlist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function createPlaylist(req: Request, res: Response) {
  try {
    const data = req.body
    const playlist = await playlistService.createPlaylist(data)
    res.status(201).json(playlist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function addSongToPlaylist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const playlist = await playlistService.addSongToPlaylist(id, data)
    res.status(201).json(playlist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    if (error instanceof ConflictError) res.status(409).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function updatePlaylist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const playlist = await playlistService.updatePlaylist(id, data)
    res.json(playlist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function deletePlaylist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await playlistService.deletePlaylist(id)
    res.json({ message: 'Playlist deleted successfully' })
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function removeSongFromPlaylist(req: Request, res: Response) {
  try {
    const playlistId = Number(req.params.id)
    const songId = Number(req.params.songId)
    const playlist = await playlistService.removeSongFromPlaylist(playlistId, songId)
    res.json(playlist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    if (error instanceof ConflictError) res.status(409).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

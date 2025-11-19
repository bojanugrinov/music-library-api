import { Request, Response } from 'express'
import { NotFoundError, ValidationError } from '../../consts/errors'
import * as songService from './song.service'

export async function getSongs(_req: Request, res: Response) {
  try {
    const songs = await songService.getSongs()
    res.json(songs)
  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getSongById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const song = await songService.getSongById(id)
    res.json(song)
  } catch (error) {
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function createSong(req: Request, res: Response) {
  try {
    const data = req.body
    const song = await songService.createSong(data)
    res.status(201).json(song)
  } catch (error) {
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateSong(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const song = await songService.updateSong(id, data)
    res.json(song)
  } catch (error) {
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'INternal server error' })
  }
}

export async function deleteSong(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await songService.deleteSong(id)
    res.json({ message: 'Song deleted successfully' })
  } catch (error) {
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal server error' })
  }
}

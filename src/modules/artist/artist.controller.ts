import { Request, Response } from 'express'
import { NotFoundError, ValidationError } from '../../consts/errors'
import * as artistService from './artist.service'

export async function getArtists(_req: Request, res: Response) {
  try {
    const artists = await artistService.getArtists()
    res.json(artists)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function getArtistById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const artist = await artistService.getArtistById(id)
    res.json(artist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function createArtist(req: Request, res: Response) {
  try {
    const data = req.body
    const artist = await artistService.createArtist(data)
    res.status(201).json(artist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function updateArtist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const artist = await artistService.updateArtist(id, data)
    res.json(artist)
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function deleteArtist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await artistService.deleteArtist(id)
    res.json({ message: 'Artist deleted successfully' })
  } catch (error) {
    console.error(error)
    if (error instanceof ValidationError) res.status(400).json({ message: error.message })
    if (error instanceof NotFoundError) res.status(404).json({ message: error.message })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

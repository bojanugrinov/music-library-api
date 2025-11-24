import prisma from '../../prisma/client'
import { NotFoundError, ValidationError } from '../../consts/errors'
import { CreateSongDto, songSelect, UpdateSongDto } from './song.types'
import * as artistService from '../artist/artist.service'

export const getSongs = () => {
  return prisma.song.findMany({
    select: songSelect,
  })
}

export const getSongById = async (id: number) => {
  if (!id || id < 0) {
    throw new ValidationError('Missing ID')
  }

  const song = await prisma.song.findUnique({
    where: { id },
    select: songSelect,
  })

  if (!song) {
    throw new NotFoundError(`Song with ID: '${id}' not found`)
  }

  return song
}

export const createSong = async (data: CreateSongDto) => {
  const { title, artistId } = data

  if (!title) throw new ValidationError('Missing title')
  if (!artistId) throw new ValidationError('MIssing artist')

  await artistService.getArtistById(data.artistId)

  return prisma.song.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: null,
    },
    include: { artist: true },
  })
}

export const updateSong = async (id: number, data: UpdateSongDto) => {
  await getSongById(id)

  return prisma.song.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export const deleteSong = async (id: number) => {
  await getSongById(id)

  return prisma.song.delete({ where: { id } })
}

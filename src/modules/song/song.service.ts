import prisma from '../../db/prismaClient'
import { NotFoundError, ValidationError } from '../../consts/errors'
import { CreateSongDto, UpdateSongDto } from './song.types'

export const getSongs = () => {
  return prisma.song.findMany()
}

export const getSongById = async (id: number) => {
  if (!id || id < 0) {
    throw new ValidationError('Missing ID')
  }

  const song = await prisma.song.findUnique({ where: { id } })

  if (!song) {
    throw new NotFoundError(`Song with ID: '${id}' not found`)
  }

  return song
}

export const createSong = (data: CreateSongDto) => {
  if (!data.title) throw new ValidationError('Missing title')
  if (!data.artist) throw new ValidationError('MIssing artist')

  return prisma.song.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: null,
    },
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

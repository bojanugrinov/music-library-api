import prisma from '../../prisma/client'
import { NotFoundError, ValidationError } from '../../consts/errors'
import { artistSelect, CreateArtistDto, UpdateArtistDto } from './artist.types'

export const getArtists = () => {
  return prisma.artist.findMany({ select: artistSelect })
}

export const getArtistById = async (id: number) => {
  if (!id || id < 0) {
    throw new ValidationError('Missing ID')
  }

  const artist = await prisma.artist.findUnique({
    where: { id },
    select: artistSelect,
  })

  if (!artist) {
    throw new NotFoundError(`Artist with ID: '${id}' not found`)
  }

  return artist
}

export const createArtist = (data: CreateArtistDto) => {
  const { name } = data

  if (!name) throw new ValidationError('Missing name')

  return prisma.artist.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: null,
    },
  })
}

export const updateArtist = async (id: number, data: UpdateArtistDto) => {
  await getArtistById(id)

  return prisma.artist.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export const deleteArtist = async (id: number) => {
  await getArtistById(id)

  return prisma.artist.delete({ where: { id } })
}

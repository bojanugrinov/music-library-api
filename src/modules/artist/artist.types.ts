import { Prisma } from '../../../prisma/generated/client'

export const artistSelect: Prisma.ArtistSelect = {
  id: true,
  name: true,
  songs: {
    select: {
      id: true,
      title: true,
    },
  },
}

export interface CreateArtistDto {
  name: string
}

export interface UpdateArtistDto {
  name?: string
}

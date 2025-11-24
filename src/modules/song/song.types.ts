import { Prisma } from '../../../prisma/generated/client'

export const songSelect: Prisma.SongSelect = {
  id: true,
  title: true,
  artist: {
    select: {
      id: true,
      name: true,
    },
  },
}

export interface CreateSongDto {
  title: string
  artistId: number
}

export interface UpdateSongDto {
  title?: string
  artistId?: number
}

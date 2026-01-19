import { Prisma } from '../../../prisma/generated/client'
import { songSelect } from '../song/song.types'

export const playlistSelect = {
  id: true,
  title: true,
  songs: {
    select: {
      song: {
        select: songSelect,
      },
    },
  },
}

export interface CreatePlaylistDto {
  title: string
}

export interface AddSongToPlaylistDto {
  songId: number
}

export interface UpdatePlaylistDto {
  title?: string
}

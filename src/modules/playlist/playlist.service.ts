import prisma from '../../prisma/client'
import { ConflictError, NotFoundError, ValidationError } from '../../consts/errors'
import {
  AddSongToPlaylistDto,
  CreatePlaylistDto,
  playlistSelect,
  UpdatePlaylistDto,
} from './playlist.types'
import { getSongById } from '../song/song.service'

export const getPlaylists = async () => {
  const playlists = await prisma.playlist.findMany({
    select: playlistSelect,
  })

  return playlists.map((playlist) => ({
    ...playlist,
    songs: playlist.songs.map((sp) => sp.song),
  }))
}

export const getPlaylistById = async (id: number) => {
  if (!id || id < 0) {
    throw new ValidationError('Missing ID')
  }

  const playlist = await prisma.playlist.findUnique({
    where: { id },
    select: playlistSelect,
  })

  if (!playlist) {
    throw new NotFoundError(`Playlist with ID: '${id}' not found`)
  }

  return {
    ...playlist,
    songs: playlist.songs.map((sp) => sp.song),
  }
}

export const createPlaylist = (data: CreatePlaylistDto) => {
  const { title } = data

  if (!title) throw new ValidationError('Missing title')

  return prisma.playlist.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: null,
    },
  })
}

export const addSongToPlaylist = async (id: number, data: AddSongToPlaylistDto) => {
  const { songId } = data

  await getPlaylistById(id)
  await getSongById(songId)

  const existing = await prisma.playlistSong.findUnique({
    where: { playlistId_songId: { playlistId: id, songId } },
  })

  if (existing) {
    throw new ConflictError(`Song with ID: '${songId}' already exists in playlist`)
  }

  await prisma.playlistSong.upsert({
    where: {
      playlistId_songId: { playlistId: id, songId },
    },
    update: {},
    create: {
      songId,
      playlistId: id,
    },
  })

  return getPlaylistById(id)
}

export const updatePlaylist = async (id: number, data: UpdatePlaylistDto) => {
  await getPlaylistById(id)

  return prisma.playlist.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export const deletePlaylist = async (id: number) => {
  await getPlaylistById(id)

  return prisma.playlist.delete({ where: { id } })
}

export const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
  await getPlaylistById(playlistId)
  await getSongById(songId)

  const existing = await prisma.playlistSong.findUnique({
    where: { playlistId_songId: { playlistId, songId } },
  })

  if (!existing) {
    throw new ConflictError(`Song with ID: '${songId}' is not in the playlist`)
  }

  await prisma.playlistSong.delete({
    where: { playlistId_songId: { playlistId, songId } },
  })

  return getPlaylistById(playlistId)
}

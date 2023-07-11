import { createSlice } from '@reduxjs/toolkit'
import { IData } from '@store/types/FetchTypes'

interface IFavourites {
  mal_id: string
}
interface IWatchlistState {
  mal_id: string
}

interface IComment {
  user: IUser
  anime: IData
  content: string
  timestamp: Date
}
interface IUser {
  _id: string
  username: string
  profileImage: string
  friends: IUser[]
  role: 'admin' | 'user'
  comments: IComment[]
  favoriteList: IData[]
  watchList: IData[]
  starList: IData[]
  createdAt: Date
  updatedAt: Date
}
export interface AuthState {
  isOpen: boolean
  user: null | IUser
}

const initialState: AuthState = {
  isOpen: false,
  user: null,
}

const slice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isOpen = action.payload
    },
    authUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { reducer: authModalReducer, actions: authModalAction } = slice

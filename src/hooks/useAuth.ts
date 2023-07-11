import { authModalAction } from '@store/reducers/Auth/AuthModalSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { BACKEND_BASE_URL } from '@components/shared/Constants/Constants'

export const useAuth = async () => {
  const dispatch = useAppDispatch()

  const storageToken = window.localStorage.getItem('token')
  const user = useAppSelector((state) => state.auth.user)
  const login = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${storageToken}` },
      }
      await axios.get(`${BACKEND_BASE_URL}auth/me`, config).then((res) => {
        dispatch(authModalAction.authUser(res.data))
      })
    } catch (error) {}
  }

  useEffect(() => {
    if (storageToken) {
      login()
    } else {
      dispatch(authModalAction.logout)
    }
  }, [storageToken])
}

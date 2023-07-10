import { authModalAction } from '@store/reducers/Auth/AuthModalSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux'

export const useAuth = async () => {
  const dispatch = useAppDispatch()

  const storageToken = window.localStorage.getItem('token')
  const user = useAppSelector((state) => state.auth.user)
  const login = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${storageToken}` },
      }
      await axios.get('http://localhost:4001/auth/me', config).then((res) => {
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

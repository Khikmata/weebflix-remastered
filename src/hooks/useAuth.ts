import { authModalAction } from '@store/reducers/Auth/AuthModalSlice'
import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from './redux'

export const useAuth = async () => {
  const dispatch = useAppDispatch()

  const storageToken = window.localStorage.getItem('token')
  const fetchData = useCallback(async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${storageToken}` },
      }
      await axios
        .get('http://localhost:4001/auth/me', config)
        .then((res) => dispatch(authModalAction.authUser(res.data)))
    } catch (error) {
      console.log(error)
    }
  }, [storageToken, dispatch])

  useEffect(() => {
    fetchData()
  }, [storageToken, fetchData])
}

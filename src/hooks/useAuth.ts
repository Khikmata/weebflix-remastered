import { authModalAction } from '@store/reducers/Auth/AuthModalSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useAppDispatch } from './redux'

export const useAuth = async () => {
  const dispatch = useAppDispatch()

  const storageToken = window.localStorage.getItem('token')

  const fetchData = async () => {
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
  }

  useEffect(() => {
    if (storageToken) {
      fetchData()
    }
  }, [storageToken])
}

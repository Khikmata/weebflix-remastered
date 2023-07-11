import { MobileActions } from '@store/reducers/Mobile/Mobile'
import { useEffect } from 'react'
import { useAppDispatch } from './redux'

export const useMobile = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      dispatch(MobileActions.setUserMobile())
    }
  }, [])
}

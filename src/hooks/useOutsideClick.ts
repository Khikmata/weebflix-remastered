import { useEffect } from 'react'
import { useLatest } from './useLatest'

export const useOutsideClick = (
  elementRef: React.MutableRefObject<any>,
  handler: any,
  attached = true,
) => {
  const latestHandler = useLatest(handler)

  useEffect(() => {
    if (!attached) return

    const handleClick = (e: any) => {
      if (!elementRef.current) return

      if (!elementRef.current.contains(e.target)) {
        latestHandler.current()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [elementRef, latestHandler, attached])
}

import React, { useCallback, useRef } from 'react'

export const useInfiniteScroll = <T>(
  onTrigger: () => void,
  loading: boolean,
  loadedAll: boolean,
): [lastElement: (node: T) => void] => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useCallback(
    (node: T): void => {
      if (loading) {
        return
      }
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loadedAll) {
          console.log('last element is visible, triggering new data Fetch')
          onTrigger()
        }
      })
      if (node) {
        observer.current.observe((node as unknown) as Element)
      }
    },
    [loading, loadedAll],
  )
  return [lastElementRef]
}

import React, { useCallback, useRef } from 'react'

export const useInfiniteScroll = (
  onTrigger: () => void,
  loading: boolean,
  loadedAll: boolean,
): [lastElement: (node: HTMLLIElement) => void] => {
  const observer: React.MutableRefObject<undefined> | { current: IntersectionObserver } = useRef()
  const lastElementRef = useCallback(
    (node: HTMLLIElement): void => {
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
        observer.current.observe(node)
      }
    },
    [loading, loadedAll],
  )
  return [lastElementRef]
}

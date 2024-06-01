import { TouchEvent, useState } from 'react'

interface SwipeInput {
  onSwipedLeft: () => void
  onSwipedRight: () => void
  onSwipedUp: () => void
  onSwipedDown: () => void
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: () => void
}

export default (input: SwipeInput): SwipeOutput => {
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)

  // the minimal distance considered as a valid swipe
  const minSwipeDistance = 20

  const onTouchStart = (e: TouchEvent) => {
    setTouchEndX(0) // otherwise the swipe is fired even with usual touch events
    setTouchEndY(0)
    setTouchStartX(e.targetTouches[0].clientX) // where touch starts
    setTouchStartY(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
  } // how touch developes

  const onTouchEnd = () => {
    //if (!touchStartX || !touchEndX ) return;
    const distanceX = touchStartX - touchEndX
    const distanceY = touchStartY - touchEndY
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isDownSwipe = distanceY < -minSwipeDistance
    if (isLeftSwipe) {
      input.onSwipedLeft()
    }
    if (isRightSwipe) {
      input.onSwipedRight()
    }
    if (isUpSwipe) {
      input.onSwipedUp()
    }
    if (isDownSwipe) {
      input.onSwipedDown()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

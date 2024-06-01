import { describe, test, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useSwipe from './useSwipe'

describe('useSwipe', () => {
  test('should get result', () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipedLeft: () => 'left',
        onSwipedRight: () => 'right',
        onSwipedUp: () => 'up',
        onSwipedDown: () => 'down',
      })
    )
    expect(result.current).toBeTruthy()
  })
})

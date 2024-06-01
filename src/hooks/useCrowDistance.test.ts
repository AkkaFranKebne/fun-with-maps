import { describe, test, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCrowDistance } from './useCrowDistance'

describe('useCrowDistance', () => {
  test('should get result', () => {
    const { result } = renderHook(() =>
      useCrowDistance(59.3293371, 13.4877472, 59.3225525, 13.4619422)
    )
    expect(result.current).toBeTruthy()
    expect(result.current).toBe(1646.7932911662942)
  })
})

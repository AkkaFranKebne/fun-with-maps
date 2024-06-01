import { describe, test, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMiddleCoordinate } from './useMiddleCoordinate'

describe('useMiddleCoordinate', () => {
  test('should get result for test values', () => {
    const { result } = renderHook(() =>
      useMiddleCoordinate([
        { lat: 50, lng: 45 },
        { lat: 0, lng: 125 },
        { lat: -50, lng: -100 },
      ])
    )
    expect(result.current).toBeTruthy()
    expect(result.current).toStrictEqual({ lat: 0, lng: 152.5 })
  })
  test('should get result for real values', () => {
    const { result } = renderHook(() =>
      useMiddleCoordinate([
        { lat: 14.692734621176195, lng: 120.9642877585083 },
        { lat: 14.691963317641529, lng: 120.9715473253784 },
        { lat: 14.70216061117758, lng: 120.9621292582138 },
      ])
    )
    expect(result.current).toBeTruthy()
    expect(result.current).toStrictEqual({
      lat: 14.697061964409555,
      lng: 120.96683829179611,
    })
  })
})

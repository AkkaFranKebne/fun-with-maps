import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react'
import { useDoubleRadius } from './useDoubleRadius';


describe('useDoubleRadius', () => {
  test('should get result', () => {

    const { result } = renderHook(() => useDoubleRadius([
      { lat: 14.692734621176195, lng: 120.9642877585083 },
      { lat: 14.691963317641529, lng: 120.9715473253784 },
      { lat: 14.702160611177580, lng: 120.9621292582138 },
    ], { "lat": 14.697061964409555,  "lng": 120.96683829179611 }));
    expect(result.current).toBeTruthy();
    expect(result.current).toBe(1520.4754067860713);
  })
});
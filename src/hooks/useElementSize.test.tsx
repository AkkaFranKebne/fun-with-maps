import {describe, test, expect } from 'vitest';
import { render, renderHook } from '@testing-library/react'
import useElementSize from './useElementSize';


describe('useElementSize', () => {
  test('should get result', () => {

    const { result } = renderHook(() => useElementSize());
    expect(result.current).toBeTruthy();
    expect(result.current).toStrictEqual([ { current: null }, { width: 0, height: 0 } ])
  })

  test('should render', () => {

    const { result } = renderHook(() => useElementSize());
    const [boxRef] = result.current;

    render(
      <div style={ { width: '5px', height: '10px' } } ref={boxRef}/>

    );

    expect(result.current).toBeTruthy();
    expect(result.current).toBe([ { current: <div style="width: 5px; height: 10px;"/> }, { width: '5px', height: '10px' } ]) //@todo
  })

});
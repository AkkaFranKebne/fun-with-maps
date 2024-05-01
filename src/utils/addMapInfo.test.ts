import {describe, test, expect } from 'vitest';
import { mock, verifyAll, when } from 'strong-mock';
import {showBubble, showBubbleOnMenuClick } from './addMapInfo';



describe('showBubbleOnMenuClick', () => {
  test('should call showBubble and return nothing else', () => {

    const showBubbleMock = mock<typeof showBubble>();

    when(() => showBubbleMock('map', 'ui', 'name', { lat: 1, lng: 2 })).thenReturn();

    expect(showBubbleOnMenuClick({
      map:'map', 
      ui: 'ui', 
      dataPoint: {name: 'name', location: { lat: 1, lng: 2 }},
      showBubbleFunction: showBubbleMock,
     })).toBeUndefined();
  })

  verifyAll();
});
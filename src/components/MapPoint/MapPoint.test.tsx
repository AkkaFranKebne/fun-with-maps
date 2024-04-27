import { fireEvent, render, screen } from '@testing-library/react';
import {describe, test, expect} from 'vitest';
import { MapPoint } from "./MapPoint";
import { MapPointType } from '../../utils/dataForMap';
import { mock, verifyAll, when } from 'strong-mock';

describe('MapPoint', () => {
  test('should render and show the name', () => {

    const stubMapPoint = {
      name: 'Name', 
      location: {
          lat: 2,
          lng: 1
      }
        ,
    };

    const onClickHandlerMock = mock<(mapPoint: MapPointType) => void>();

    render(
      <MapPoint data={stubMapPoint} onClickHandler={onClickHandlerMock}/>
    );
    
    expect(screen.getByRole('map-point')).toBeDefined();
    expect(screen.queryByText('Name')).toBeDefined();
  });

  test('handle on click', async () => {

    const stubMapPoint = {
      name: 'Name', 
      location: {
          lat: 2,
          lng: 1
      }
        ,
    };

    const onClickHandlerMock = mock<(mapPoint: MapPointType) => void>();

    when(() => onClickHandlerMock(stubMapPoint)).thenReturn(undefined);

    render(
      <MapPoint data={stubMapPoint} onClickHandler={onClickHandlerMock}/>
    );
    expect(screen.getByRole('map-point')).toBeDefined();

    // hide map points list
    fireEvent.click(screen.getByRole('map-point'))
    verifyAll();
  })
});
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {describe, test, expect} from 'vitest';
import { MapPointsList } from "./MapPointsList";
import { MapPointType } from '../../utils/dataForMap';
import { mock } from 'strong-mock';

describe('MapPointsList', () => {
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
      <MapPointsList list={[stubMapPoint]} onClickHandler={onClickHandlerMock}/>
    );
    expect(screen.queryByText('Name')).toBeDefined();
    expect(screen.getByText('Check our locations:')).toBeDefined();
    expect(screen.findByTestId('drag-indicator')).toBeDefined();
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

    render(
      <MapPointsList list={[stubMapPoint]} onClickHandler={onClickHandlerMock}/>
    );
    expect(screen.findByTestId('close')).toBeDefined();
    expect(screen.getByRole('close')).toBeDefined();
    fireEvent.click(screen.getByRole('close'))
    // await expect(screen.findByText('Name')).toBeNull() how to check if it is unvisible?

  })
});
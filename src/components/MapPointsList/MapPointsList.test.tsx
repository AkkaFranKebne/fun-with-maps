import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText('Name')).toBeDefined()
  })
});
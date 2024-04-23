import React from 'react';
import { render } from '@testing-library/react';
import { MapPointsList } from "./MapPointsList";


describe('MapPointsList', () => {
  it('should render', () => {

    const mockMapPoint = {
      name: 'string',
      location: {
          lat: 2,
          lng: 1
      }
        ,
    };

    render(
      <MapPointsList list={[mockMapPoint]} onClickHandler={() => undefined}/>
    );
  })
});
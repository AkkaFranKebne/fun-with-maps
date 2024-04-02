import React, { useState } from 'react';
import { MyMap } from './Map';
import { Position, mapPointsList } from '../utils/dataForMap';
import { MapPointsList } from './MApPointsList';

const apikey = import.meta.env.VITE_HERE_MAP_API_KEY;
export const AppContent: React.FC = () => {
  const [mapPointPosition, setMapPointPosition] = useState<Position | null  >(null);

  const onClickHandler = (location: Position) => {
    setMapPointPosition(location);
  };

  return (
  <div className='content'>
    {apikey && 
    <>
      <MapPointsList list={mapPointsList} onClickHandler={onClickHandler}/>
      <MyMap apikey={apikey} />
    </>}
  </div>
  )
};
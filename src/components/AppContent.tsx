import React, { useState } from 'react';
import { MyMap } from './Map';
import { MapPointType, mapPointsList, userPosition } from '../utils/dataForMap';
import { MapPointsList } from './MapPointsList';
import './AppContent.scss'

const apikey = import.meta.env.VITE_HERE_MAP_API_KEY;
export const AppContent: React.FC = () => {
  const [mapPointPosition, setMapPointPosition] = useState<MapPointType | null  >(null);

  const onClickHandler = (mapPoint: MapPointType) => {
    setMapPointPosition(mapPoint);
  };

  return (
    apikey && 
    (<div className='content'>
      <MapPointsList list={mapPointsList} onClickHandler={onClickHandler}/>
      <MyMap apikey={apikey} userPosition={userPosition} mapPointPosition={mapPointPosition}/>
    </div>
    )
  )
};
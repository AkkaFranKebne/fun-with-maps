import React, { useEffect, useState } from 'react';
import { MyMap } from './Map';
import { MapPointType, Position, coordinatesList, userPosition } from '../utils/dataForMap';
import { MapPointsList } from './MapPointsList';
import './AppContent.scss'
import { geoCodeService } from '../services/GeoCodeService';

const apikey = process.env.VITE_HERE_MAP_API_KEY;
export const AppContent: React.FC = () => {
  const [mapPointPosition, setMapPointPosition] = useState<MapPointType | null  >(null);
  const [mapPointsList, setMapPointsList] = useState<MapPointType[] | null  >(null);

  const onClickHandler = (mapPoint: MapPointType) => {
    setMapPointPosition(mapPoint);
  };

  useEffect(() => {
    const fetchMapPoint = async (lat: number, lng: number) =>  await geoCodeService.getAddress(lat,lng);   

    const fetchMapPoints = async () => {
      const promises: Promise<MapPointType>[] = coordinatesList.map(async (coordinates: Position) =>   await fetchMapPoint(coordinates.lat, coordinates.lng));
      const resolved = await Promise.all(promises);
      setMapPointsList(resolved);
    }
    
    fetchMapPoints();
  }, [])

  return (
    apikey && mapPointsList &&
    (<div className='content'>
      <MapPointsList list={mapPointsList} onClickHandler={onClickHandler}/>
      <MyMap apikey={apikey} userPosition={userPosition} mapPointPosition={mapPointPosition} mapPointsList={mapPointsList}/>
    </div>
    )
  )
};
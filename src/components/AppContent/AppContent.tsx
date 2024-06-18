import React, { useEffect, useState } from 'react'
import { MyMap } from '../Map/Map'
import {
  MapPointType,
  Position,
  coordinatesList,
} from '../../utils/dataForMap'
import { MapPointsList } from '../MapPointsList/MapPointsList'
import './AppContent.scss'
import { geoCodeService } from '../../services/GeoCodeService'
import { userService } from '../../services/UserService'

const apikey = import.meta.env.VITE_HERE_MAP_API_KEY
export const AppContent: React.FC = () => {
  const [mapPointPosition, setMapPointPosition] = useState<MapPointType | null>(
    null
  );
  const [mapPointsList, setMapPointsList] = useState<MapPointType[] | null>(
    null
  );
  const [userPosition, setUserPosition] = useState<Position>({ lat: 0, lng: 0 });

  const onClickHandler = (mapPoint: MapPointType) => {
    setMapPointPosition(mapPoint)
  }

  useEffect(() => {
    const fetchMapPoint = async (lat: number, lng: number) =>
      await geoCodeService.getAddress(lat, lng)

    const fetchUser = async () => {
      const resolved = await userService.getUser();
      setUserPosition(resolved);
    }
      

    const fetchMapPoints = async () => {
      const promises: Promise<MapPointType>[] = coordinatesList.map(
        async (coordinates: Position) =>
          await fetchMapPoint(coordinates.lat, coordinates.lng)
      )
      const resolved = await Promise.all(promises);
      setMapPointsList(resolved);
    }

    fetchMapPoints();
    fetchUser();
  }, [])

  return (
    apikey &&
    mapPointsList && (
      <div className="content">
        <MapPointsList list={mapPointsList} onClickHandler={onClickHandler} />
        <MyMap
          apikey={apikey}
          userPosition={userPosition}
          mapPointPosition={mapPointPosition}
          mapPointsList={mapPointsList}
        />
      </div>
    )
  )
}

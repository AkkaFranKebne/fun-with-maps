
import React, { useState } from 'react';
import { MapPointType } from '../utils/dataForMap';
import { MapPoint } from './MapPoint';
import './MapPointsList.scss'

type MapPointsList = {
  list: MapPointType[];
  onClickHandler: (mapPoint: MapPointType) => void;
}

export const MapPointsList: React.FC<MapPointsList> = (props)  => {
  const [ showMapPointsList, setShowMapPointList ] = useState<boolean>(true);
  const entries = props.list;

  const handleOnClick = () => {
    return showMapPointsList ? setShowMapPointList(false) : setShowMapPointList(true);
  }

  const list = entries.map((entry) => {
    return <MapPoint data={entry} onClickHandler={props.onClickHandler} key={Math.random()}></MapPoint>
  });
  return (
  <div id='map-points-wrapper' className={!showMapPointsList ? 'onTop' : undefined}>
    <div id='header-wrapper'>
      <h2>Check our locations:</h2>
      <div id='carret-down' className={showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/>
      <div id='carret-up' className={!showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/> 
    </div>
    <div id="map-points-list" className={!showMapPointsList ? 'undisplayed' : undefined}>
    {list}
    </div>
  </div>
  )
}
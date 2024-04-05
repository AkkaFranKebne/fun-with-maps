
import React from 'react';
import { MapPointType } from '../utils/dataForMap';
import { MapPoint } from './MapPoint';

type MapPointsList = {
  list: MapPointType[];
  onClickHandler: (mapPoint: MapPointType) => void;
}

export const MapPointsList: React.FC<MapPointsList> = (props)  => {
  const entries = props.list;

  const list = entries.map((entry) => {
    return <MapPoint data={entry} onClickHandler={props.onClickHandler} key={Math.random()}></MapPoint>
  });
  return (
    <div id="map-points-list" style={ {'display': 'grid'} } >
    {list}
    </div>
  )
}

import React, { useState } from 'react';
import { MapPointType } from '../utils/dataForMap';
import { MapPoint } from './MapPoint';
import './MapPointsList.scss'
import useSwipe from '../hooks/useSwipe';

type MapPointsList = {
  list: MapPointType[];
  onClickHandler: (mapPoint: MapPointType) => void;
}

export const MapPointsList: React.FC<MapPointsList> = (props)  => {
  const [ showMapPointsList, setShowMapPointList ] = useState<boolean>(true);
  const entries = props.list;

  const swipeHandlers = useSwipe({ 
    onSwipedLeft: () => console.log('left'), //todo
    onSwipedRight: () => console.log('right'),  //todo
    onSwipedUp: () => setShowMapPointList(true), 
    onSwipedDown: () => setShowMapPointList(false),
  });

  const handleOnClick = () => {
    return showMapPointsList ? setShowMapPointList(false) : setShowMapPointList(true);
  }

  const list = entries.map((entry) => {
    return <MapPoint data={entry} onClickHandler={props.onClickHandler} key={Math.random()}></MapPoint>
  });
  return (
  <div id='map-points-wrapper' {...swipeHandlers} className={!showMapPointsList ? 'onTop' : undefined}>
    <div id='drag-indicator-wrapper'><div id='drag-indicator'/></div>
    <div id='header-wrapper'>
      <h2 className={!showMapPointsList ? 'undisplayedDesktop' : undefined}>Check our locations:</h2>
      <div id='carret-down' className={!showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/>
      <div id='carret-up' className={showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/> 
      <div id='close' className={!showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/>
      <div id='open' className={showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/> 
    </div>
    <div id="map-points-list" className={!showMapPointsList ? 'unvisible' : undefined}>
    {list}
    </div>
  </div>
  )
}
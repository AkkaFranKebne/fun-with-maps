
import React, { useState } from 'react';
import { MapPointType } from '../../utils/dataForMap';
import { MapPoint } from '../MapPoint/MapPoint';
import './MapPointsList.scss'
import useSwipe from '../../hooks/useSwipe';

export type MapPointsListType = {
  list: MapPointType[];
  onClickHandler: (mapPoint: MapPointType) => void;
}

export const MapPointsList: React.FC<MapPointsListType> = (props)  => {
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

  let count = 0;
  const list = entries.map((entry) => {
    count++
    return <MapPoint data={entry} onClickHandler={props.onClickHandler} key={Math.random()} id={count}></MapPoint>
  });

  return (
  <div id='map-points-wrapper'  className={!showMapPointsList ? 'onTop' : undefined}>
    <div id='drag-indicator-wrapper' {...swipeHandlers}><div id='drag-indicator' data-testid='drag-indicator'/></div>
    <div id='header-wrapper'>
      <h2 role='caption' className={!showMapPointsList ? 'undisplayedDesktop' : undefined}>Our locations:</h2>
      <div id='carret-down' role='carret-down' data-testid='carret-down' className={!showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/>
      <div id='carret-up' role='carret-up' data-testid='carret-up' className={showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/> 
      <div id='close' role='close' data-testid='close' className={!showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/>
      <div id='open' role='open' data-testid='open' className={showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/> 
    </div>
    <div id="map-points-list" role='map-points-list' className={!showMapPointsList ? 'unvisible' : undefined}>
    {list}
    </div>
  </div>
  )
}
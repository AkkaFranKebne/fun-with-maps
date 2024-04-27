
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

  const list = entries.map((entry) => {
    return <MapPoint data={entry} onClickHandler={props.onClickHandler} key={Math.random()}></MapPoint>
  });
  return (
  <div id='map-points-wrapper' {...swipeHandlers} className={!showMapPointsList ? 'onTop' : undefined}>
    <div id='drag-indicator-wrapper'><div id='drag-indicator' test-id='drag-indicator'/></div>
    <div id='header-wrapper'>
      <h2 className={!showMapPointsList ? 'undisplayedDesktop' : undefined}>Check our locations:</h2>
      <div id='carret-down' role='carret-down'  className={!showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/>
      <div id='carret-up' role='carret-up' className={showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/> 
      <div id='close' role='close' className={!showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/>
      <div id='open' role='open' className={showMapPointsList ? 'undisplayed' : undefined} onClick={handleOnClick}/> 
    </div>
    <div id="map-points-list" role='map-points-list' className={!showMapPointsList ? 'unvisible' : undefined}>
    {list}
    </div>
  </div>
  )
}
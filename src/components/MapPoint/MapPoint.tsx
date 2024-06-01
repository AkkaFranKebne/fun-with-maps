import React, { useState } from 'react'
import { MapPointType } from '../../utils/dataForMap'
import './MapPoint.scss'

type MapPoint = {
  data: MapPointType
  onClickHandler: (mapPoint: MapPointType) => void
  id: number
}

export const MapPoint: React.FC<MapPoint> = (props) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const handleClick = () => {
    props.onClickHandler(props.data)
    setClicked(true)
  }

  return (
    <div
      onClick={handleClick}
      role="map-point"
      className="map-point"
      id={clicked ? 'clicked' : undefined}
      data-testid={`map-point-${props.id}`}
    >
      {props.data.name}
    </div>
  )
}

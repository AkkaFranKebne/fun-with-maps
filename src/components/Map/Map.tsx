import React, { useEffect, useRef } from 'react'
import H from '@here/maps-api-for-javascript'
import { MapPointType, Position } from '../../utils/dataForMap'
import { addInfoBubble, showBubbleOnMenuClick } from '../../utils/addMapInfo'
import useElementSize from '../../hooks/useElementSize'
import { useMiddleCoordinate } from '../../hooks/useMiddleCoordinate'
import { useDoubleRadius } from '../../hooks/useDoubleRadius'

export type MyMapType = { 
  apikey: string
  userPosition: Position
  mapPointPosition: MapPointType | null
  mapPointsList: MapPointType[]
  coordinatesList: Position[]
}

export const MyMap: React.FC<MyMapType> = (props) => {
  const mapRef = useRef<HTMLInputElement | null>(null)
  const map = useRef<HTMLInputElement | null>(null)
  const platform = useRef<HTMLInputElement | null>(null)
  const uis = useRef<HTMLInputElement | null>(null)
  const { apikey, userPosition, mapPointPosition, mapPointsList, coordinatesList } = props

  // observing the map's div size
  const [boxRef, { width, height }] = useElementSize()

  useEffect(
    () => {
      // Check if the map object has already been created
      if (!map.current) {
        // Create a platform object with the API key
        //@ts-ignore
        platform.current = new H.service.Platform({ apikey })
        // Create a new Raster Tile service instance
        //@ts-ignore
        const rasterTileService = platform.current.getRasterTileService({
          queryParams: {
            style: 'explore.day',
            size: 512,
          },
        })
        // Creates a new instance of the H.service.rasterTile.Provider class
        // The class provides raster tiles for a given tile layer ID and pixel format
        const rasterTileProvider = new H.service.rasterTile.Provider(
          rasterTileService
        )
        // Create a new Tile layer with the Raster Tile provider
        const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider)
        // Create a new map instance with the Tile layer, center and zoom level
        //@ts-ignore
        const newMap = new H.Map(mapRef.current, rasterTileLayer, {
          pixelRatio: window.devicePixelRatio,
          center: userPosition,
          zoom: 14,
        })

        // Add panning and zooming behavior to the map
        //@ts-ignore
        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(newMap)
        )

        // Set the map object to the reference
        //@ts-ignore
        map.current = newMap

        // Create the default UI:
        const ui = H.ui.UI.createDefault(newMap, rasterTileLayer)
        //@ts-ignore
        uis.current = ui

        // adding bubble info
        addInfoBubble({ map: newMap, ui, pointsData: mapPointsList, H })

        // adding circle

        const circleCenterPosition = useMiddleCoordinate(coordinatesList)
        const circle = new H.map.Circle(
          circleCenterPosition,
          useDoubleRadius(coordinatesList, circleCenterPosition),
          {
            //@ts-ignore
            style: {
              fillColor: 'rgba(255, 255, 255, 0.5)',
              strokeColor: '#829',
              lineWidth: 1,
            },
          }
        )
        newMap.addObject(circle)

        // resize map on window resize
        window.addEventListener('resize', function () {
          newMap.getViewPort().resize()
        })
      }

      if (mapPointPosition) {
        showBubbleOnMenuClick({
          map: map.current,
          ui: uis.current,
          dataPoint: mapPointPosition,
        })
      }
    },
    // Dependencies array
    [apikey, userPosition, mapPointPosition]
  )

  useEffect(() => {
    if (map.current) {
      // resizing map on div size change
      //@ts-ignore
      map.current.getViewPort().resize()
    }
  }, [width, height])

  // Return a div element to hold the map
  return (
    <div style={{ width: '100%', height: '100%' }} ref={boxRef}>
      <div style={{ width: '100%', height: '100%' }} ref={mapRef} />
    </div>
  )
}

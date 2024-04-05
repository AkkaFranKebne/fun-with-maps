import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';
import { Position, circleCenterPosition, mapPointsList } from '../utils/dataForMap';
import { addInfoBubble } from '../utils/addMapInfo';

type MyMap = {
  apikey: string;
  userPosition: Position;
  mapPointPosition: Position | null;
}



export const MyMap: React.FC<MyMap> = (props) => {
  const mapRef = useRef<HTMLInputElement | null>(null);
  const map = useRef<HTMLInputElement | null>(null);
  const platform = useRef<HTMLInputElement | null>(null)
  const { apikey, userPosition, mapPointPosition  } = props;

  useEffect(
    () => {
      // Check if the map object has already been created
      if (!map.current) {
        // Create a platform object with the API key
        //@ts-ignore
        platform.current = new H.service.Platform({ apikey });
        // Create a new Raster Tile service instance
         //@ts-ignore
        const rasterTileService = platform.current.getRasterTileService({
          queryParams: {
            style: "explore.day",
            size: 512,
          },
        });
        // Creates a new instance of the H.service.rasterTile.Provider class
        // The class provides raster tiles for a given tile layer ID and pixel format
        const rasterTileProvider = new H.service.rasterTile.Provider(
          rasterTileService
        );
        // Create a new Tile layer with the Raster Tile provider
        const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
        // Create a new map instance with the Tile layer, center and zoom level
         //@ts-ignore
        const newMap = new H.Map(mapRef.current, rasterTileLayer, {
          pixelRatio: window.devicePixelRatio,
          center: userPosition,
          zoom: 14,
        });
  
        // Add panning and zooming behavior to the map
        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(newMap)
        );

        // Set the map object to the reference
         //@ts-ignore
        map.current = newMap;

        // Create the default UI:
        //@ts-ignore
        const ui = H.ui.UI.createDefault(newMap, rasterTileLayer);

        // adding bubble info
        addInfoBubble(newMap, ui, mapPointsList);

        // adding circle
        const circle = new H.map.Circle(circleCenterPosition, 1100, {
          style: {
            fillColor: 'rgba(255, 255, 255, 0.5)',
            strokeColor: '#829',
            lineWidth: 1
          }
        });
        newMap.addObject(circle);

        // add polygon 
        //addPolygonToMap(newMap);
      }
 

    /*       if (mapPointPosition) {
        calculateRoute(platform.current, map.current, userPosition, mapPointPosition);
    } */

    },
    // Dependencies array
    [apikey, userPosition, mapPointPosition]
  );
  
  // Return a div element to hold the map
  return <div style={ { width: "100%", height: "70%" } } ref={mapRef} />;

  
 }
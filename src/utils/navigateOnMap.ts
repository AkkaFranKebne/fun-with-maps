import { Position } from "./dataForMap";

/**
 * Moves the map 
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
export function moveMap(map: any, position: Position){
  map.setCenter(position);
  map.setZoom(15);
}
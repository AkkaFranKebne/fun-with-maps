import { Position } from './dataForMap'

/**
 * Moves the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */

export const moveMap = (map: any, position: Position, zoom: Number) => {
  map.getViewModel().setLookAtData(
    {
      position,
      zoom,
    },
    true
  )
}

import { Position } from '../utils/dataForMap'

function getMiddle(prop: 'lat' | 'lng', markers: Position[]) {
  let values = markers.map((m: Position) => m[prop])
  let min = Math.min(...values)
  let max = Math.max(...values)
  if (prop === 'lng' && max - min > 180) {
    values = values.map((val: any) => (val < max - 180 ? val + 360 : val))
    min = Math.min(...values)
    max = Math.max(...values)
  }
  let result = (min + max) / 2
  if (prop === 'lng' && result > 180) {
    result -= 360
  }
  return result
}

export function useMiddleCoordinate(markers: Position[]) {
  return {
    lat: getMiddle('lat', markers),
    lng: getMiddle('lng', markers),
  }
}

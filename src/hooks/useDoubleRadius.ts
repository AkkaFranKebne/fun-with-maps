import { Position } from "../utils/dataForMap";
import { useCrowDistance } from "./useCrowDistance";

export const useDoubleRadius = (markers: Position[], center: Position) => {
  const theFurtherMarker = markers.reduce(
    (prev: Position, current: Position) => {
      const prevDataForCrow = useCrowDistance(prev.lat, prev.lng, center.lat, center.lng);
      console.log('prevDataForCrow', prevDataForCrow)
      const currentDataForCrow = useCrowDistance(current.lat, current.lng, center.lat, center.lng);
      return prevDataForCrow > currentDataForCrow ? prev : current
    }
  )
  return  2 * useCrowDistance(theFurtherMarker.lat, theFurtherMarker.lng, center.lat, center.lng);
}
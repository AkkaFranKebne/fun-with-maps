import { dataForPolygon } from "./dataForMap";

/**
 * Adds a polygon to the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
export function addPolygonToMap(map: any) {
  var lineString = new H.geo.LineString(dataForPolygon);
  map.addObject(
    //@ts-ignore
    new H.map.Polygon(lineString, {
      style: {
        fillColor: '#FFFFCC',
        strokeColor: '#829',
        lineWidth: 8
      }
    })
  );
}
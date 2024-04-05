import { MapPointType, Position } from "./dataForMap";
import { mappointIcon } from "./mapPoint";
import { moveMap } from "./navigateOnMap";



/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
 function addMarkerToGroup(group: any, coordinate: any, html: any) {
  //@ts-ignore
  var marker = new H.map.Marker(coordinate, {icon: mappointIcon});
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

/**
 * Shows bubble on the map
 */
 function showBubble(map: any, ui: any, name: string, location: Position) {
  //close the opened bubble
  ui.getBubbles().forEach((bub: any) => ui.removeBubble(bub));
  // event target is the marker itself, group is a parent event target
  // for all objects that it contains
  var bubble = new H.ui.InfoBubble(location, {
    // read custom data
    content: name
  });
  // show info bubble
  ui.addBubble(bubble);
  // center map on users position
  moveMap(map, location)
} 

export function addInfoBubble(map: any, ui: any, pointsData: MapPointType[]) {
  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt: any) {
    showBubble(map, ui, evt.target.getData(), evt.target.getGeometry())
  }, false);

  pointsData.map(point => {
    return  addMarkerToGroup(group, point.location, point.name);
  })
}

 export function showBubbleOnMenuClick(map: any, ui: any, dataPoint: MapPointType) {
  showBubble(map, ui, dataPoint.name, dataPoint.location)
}  
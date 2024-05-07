import { MapPointType, Position } from "./dataForMap";
import { mapPoint } from "./mapPoint";
import { moveMap } from "./navigateOnMap";



/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
 export function addMarkerToGroup(group: any, coordinate: any, html: any) {
  // Create an icon, an object holding the latitude and longitude, and a marker:
  const  mappointIcon = new H.map.Icon(mapPoint) 
  //@ts-ignore
  var marker = new H.map.Marker(coordinate, {icon: mappointIcon});
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
  }

/**
 * Shows bubble on the map
 */
 export function showBubble(map: any, ui: any, name: string, location: Position) {
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

type addInfoBubbleType = {
  map: any, 
  ui: any, 
  pointsData: MapPointType[],
  showBubbleFunction?: typeof showBubble,
  addMarkerToGroupFunction?: typeof addMarkerToGroup,
  H?: any,
}

export function addInfoBubble(props: addInfoBubbleType) {
  const { H, map, ui, pointsData, showBubbleFunction, addMarkerToGroupFunction } = props;
  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt: any) {
    const showCorrectBubble = showBubbleFunction || showBubble;
    showCorrectBubble(map, ui, evt.target.getData(), evt.target.getGeometry())
  }, false);

  pointsData.map(point => {
    const addCorrectMarkerToGroup = addMarkerToGroupFunction || addMarkerToGroup;
    return  addCorrectMarkerToGroup(group, point.location, point.name);
  })
}

type showBubbleOnMenuClickType = {
  map: any, 
  ui: any, 
  dataPoint: MapPointType, 
  showBubbleFunction?: typeof showBubble,
}

 export const showBubbleOnMenuClick = (props: showBubbleOnMenuClickType ) => {

  const { map, ui, dataPoint, showBubbleFunction }  = props;
  const showCorrectBubble = showBubbleFunction || showBubble;
  showCorrectBubble(map, ui, dataPoint.name, dataPoint.location);
}   
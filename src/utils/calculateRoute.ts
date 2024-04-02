//@ts-nocheck

import { getMarkerIcon } from "../components/MarkerIcon";

export function calculateRoute(platform, map, start, destination) {
  function routeResponseHandler(response) {
      const sections = response.routes[0].sections;
      const lineStrings = [];
      sections.forEach((section) => {
          // convert Flexible Polyline encoded string to geometry
          lineStrings.push(H.geo.LineString.fromFlexiblePolyline(section.polyline));
      });
      const multiLineString = new H.geo.MultiLineString(lineStrings);
      const bounds = multiLineString.getBoundingBox();

      // Create the polyline for the route
      const routePolyline = new H.map.Polyline(multiLineString, {
          style: {
              lineWidth: 5
          }
      });

      // Remove all the previous map objects, if any
      map.removeObjects(map.getObjects());
      // Add the polyline to the map
      map.addObject(routePolyline);
      map.addObjects([
          // Add a marker for the user
          new H.map.Marker(start, {
              icon: getMarkerIcon('red')
          }),
          // Add a marker for the selected restaurant
          new H.map.Marker(destination, {
              icon: getMarkerIcon('green')
          })
      ]);
  }

  // Get an instance of the H.service.RoutingService8 service
  const router = platform.getRoutingService(null, 8);

  // Define the routing service parameters
  const routingParams = {
      'origin': `${start.lat},${start.lng}`,
      'destination': `${destination.lat},${destination.lng}`,
      'transportMode': 'car',
      'return': 'polyline'
  };
  // Call the routing service with the defined parameters

  router.calculateRoute(routingParams, routeResponseHandler, console.error);
}

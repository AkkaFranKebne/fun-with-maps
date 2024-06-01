export function getMarkerIcon(color: any) {
  const svgCircle = `<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="marker">
              <circle cx="10" cy="10" r="7" fill="${color}" stroke="${color}" stroke-width="4" />
              </g></svg>`
  return new H.map.Icon(svgCircle, {
    anchor: {
      x: 10,
      y: 10,
    },
  })
}

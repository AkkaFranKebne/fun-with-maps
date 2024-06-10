export type Position = {
  lat: number
  lng: number
}

export type MapPointType = {
  name: string
  location: Position
}

export const userPosition: Position = { lat: 64.1472, lng: -21.9398 } // would come from geo location in real life

export const coordinatesList: Position[] = [
  // would come from the client in real life
  { lat: 64.1508, lng: -21.9536 },
  { lat: 64.1502, lng: -21.9519 },
  { lat: 64.1475, lng: -21.9347 },
  { lat: 64.1494, lng: -21.9337 },
]

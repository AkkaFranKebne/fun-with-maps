
export type Position = {
  lat: number;
  lng: number;
}

export type MapPointType = {
  name: string;
  location: Position;
}

export const userPosition: Position = { lat: 64.1472, lng: -21.9398 };

export const circleCenterPosition: Position   = { lat: 64.14410904777836, lng: -21.93906861878455 };

export const coordinatesList: Position[] = [
  { lat: 64.1508, lng: -21.9536 },
  { lat: 64.1502, lng: -21.9519 },
  { lat: 64.1475, lng: -21.9347 },
  { lat: 64.1494, lng: -21.9337 }, 
];

export const dataForPolygon = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100]
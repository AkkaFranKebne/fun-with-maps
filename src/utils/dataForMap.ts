
export type Position = {
  lat: number;
  lng: number;
}

export type MapPointType = {
  name: string;
  location: Position;
}

export const userPosition: Position = { lat: 64.1472, lng: -21.9398 };

export const mapPointsList: MapPointType[] = [
  {
    name: "The Fish Market",
    location: { lat: 64.1508, lng: -21.9536 },
  },
  {
    name: "Bæjarins Beztu Pylsur",
    location: { lat: 64.1502, lng: -21.9519 },
  },
  {
    name: "Grillmarkadurinn",
    location: { lat: 64.1475, lng: -21.9347 },
  },
  {
    name: "Kol Restaurant",
    location: { lat: 64.1494, lng: -21.9337 },
  },
];
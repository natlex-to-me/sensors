import { Coordinates } from '../models/coordinates';
import { Cities } from './cities';

type CitiesMap = {
  [key in Cities]: Coordinates;
};

export const CityCoordinates: CitiesMap = {
  [Cities.Ptz]: {
    latitude: 61.790093,
    longitude: 34.375086,
  },
  [Cities.Spb]: {
    latitude: 59.9445,
    longitude: 30.3168,
  },
  [Cities.Msc]: {
    latitude: 55.75583,
    longitude: 37.61778,
  },
};

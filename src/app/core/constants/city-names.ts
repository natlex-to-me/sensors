import { Cities } from './cities';

type CitiesMap = {
  [key in Cities]: string;
};

export const CityNames: CitiesMap = {
  [Cities.Ptz]: 'Petrozavodsk',
  [Cities.Spb]: 'Saint-Petersburg',
  [Cities.Msc]: 'Moscow',
};

import {
  Observable,
  OperatorFunction,
  pipe,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { CityCoordinates } from '../../core/constants';
import { Coordinates } from '../../core/models';

export function setCityCoordinates(cityId$: Observable<string>): Observable<Coordinates> {
  return cityId$.pipe(
    convertCityToCoordinates(),
  );
}

function convertCityToCoordinates(): OperatorFunction<string, Coordinates> {
  return pipe(
    map((cityId) => <Coordinates>CityCoordinates[cityId]),
  );
}

import { Params } from '@angular/router';
import {
  Observable,
  OperatorFunction,
  pipe,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { AppRouteParams } from '../../core/constants';

export function setCity(params$: Observable<Params>): Observable<string> {
  return params$.pipe(
    convertParamsToCity(),
  );
}

function convertParamsToCity(): OperatorFunction<Params, string> {
  return pipe(
    map((params) => String(params[AppRouteParams.CityId])),
  );
}

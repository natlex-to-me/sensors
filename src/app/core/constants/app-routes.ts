import { AppRouteParams } from './app-route-params';

export class AppRoutes {
  static Landing = '';
  static Details = 'details';
  static DetailsCityId = `:${AppRouteParams.CityId}`;

  static getUrlFromRoute(...route: string[]): string {
    return `/${route.join('/')}`;
  }
}

export const HOME_ROUTE = AppRoutes.Landing;

export class AppRoutes {
  static Landing = '';
  static Details = 'details';

  static getUrlFromRoute(...route: string[]): string {
    return `/${route.join('/')}`;
  }
}

export const HOME_ROUTE = AppRoutes.Landing;

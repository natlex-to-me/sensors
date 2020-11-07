import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRoutes } from 'src/app/core/constants/app-routes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  routeToDetails = AppRoutes.Details;
}

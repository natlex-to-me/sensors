import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { Cities } from '../../../../core/constants/cities';
import { CityNames } from '../../../../core/constants/city-names';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss'],
})
export class HeaderPanelComponent {
  readonly cities = Object.values(Cities);
  readonly cityNames = CityNames;

  detailsLink(city: Cities): string[] {
    return ['../', city];
  }
}

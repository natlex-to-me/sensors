import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProjectName } from '../core/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly projectName = ProjectName;
}

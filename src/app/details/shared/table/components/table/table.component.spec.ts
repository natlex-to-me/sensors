import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '../../../../../../environments/environment';
import { YandexWeatherConfigService } from '../../../../../core/backend/services/yandex-weather-config.service';
import { AppRoutes } from '../../../../../core/constants/app-routes';
import { RouterLinkStubDirective } from '../../../../../test/router-link-stub.directive';
import { DetailsLazyLoadedModule } from '../../../../details.lazy-loaded.module';
import { routes } from '../../../../details.routes';
import { CityCoordinatesConfigService } from '../../../../services/city-coordinates-config.service';
import { TableComponent } from './table.component';

let component: TableComponent = null;
let fixture: ComponentFixture<TableComponent> = null;

describe('TableComponent', () => {
  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        declarations: [
          TableComponent,
        ],
        imports: [
          DetailsLazyLoadedModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes(routes),
        ],
        providers: [
          {
            provide: CityCoordinatesConfigService,
            useValue: environment.defaultCityCoordinates,
          },
          {
            provide: YandexWeatherConfigService,
            useValue: environment.yandexWeatherApiKey,
          },
        ],
      })
      .overrideModule(DetailsLazyLoadedModule, {
        remove: {
          imports: [
            RouterModule,
          ]
        },
        add: {
          declarations: [
            RouterLinkStubDirective,
          ],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
      });
  });

  tests();
});

function tests() {
  let linkElements: DebugElement[] = [];
  let routerLinks: RouterLinkStubDirective[] = [];

  beforeEach(() => {
    fixture.detectChanges();

    linkElements = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    routerLinks = linkElements.map((de) => de.injector.get(RouterLinkStubDirective));
  });

  it('should create', () => {
    expect(component).not.toBeNull();
  });

  it('should render h2 tag', () => {
    const compiled = <HTMLElement>fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h2').textContent).toContain('Table');
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(1);
    expect(routerLinks[0].routerLink).toBe(AppRoutes.getUrlFromRoute(AppRoutes.Details));
  });
}

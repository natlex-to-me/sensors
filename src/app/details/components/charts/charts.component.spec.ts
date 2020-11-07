import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '../../../../environments/environment';
import { YandexWeatherConfigService } from '../../../core/backend/services/yandex-weather-config.service';
import { RouterLinkStubDirective } from '../../../test/router-link-stub.directive';
import { DetailPaths } from '../../detail-paths';
import { DetailsLazyLoadedModule } from '../../details.lazy-loaded.module';
import { routes } from '../../details.routes';
import { CityCoordinatesConfigService } from '../../services/city-coordinates-config.service';
import { ChartsComponent } from './charts.component';

let component: ChartsComponent = null;
let fixture: ComponentFixture<ChartsComponent> = null;

describe('ChartsComponent', () => {
  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        declarations: [
          ChartsComponent,
        ],
        imports: [
          DetailsLazyLoadedModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes(routes),
          NoopAnimationsModule,
        ],
        providers: [
          {
            provide: CityCoordinatesConfigService,
            useValue: environment.cityCoordinates,
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
        fixture = TestBed.createComponent(ChartsComponent);
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

    expect(compiled.querySelector('h2').textContent).toContain('Charts');
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(1);
    expect(routerLinks[0].routerLink).toEqual([DetailPaths.table]);
  });
}

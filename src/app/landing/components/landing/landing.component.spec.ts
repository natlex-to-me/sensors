import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppRoutes } from '../../../core/constants/app-routes';
import { RouterLinkStubDirective } from '../../../test/router-link-stub.directive';
import { LandingLazyLoadedModule } from '../../landing.lazy-loaded.module';
import { routes } from '../../landing.routes';
import { LandingComponent } from './landing.component';

let component: LandingComponent = null;
let fixture: ComponentFixture<LandingComponent> = null;

describe('LandingComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          LandingComponent,
        ],
        imports: [
          LandingLazyLoadedModule,
          RouterTestingModule.withRoutes(routes),
        ],
      })
      .overrideModule(LandingLazyLoadedModule, {
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
        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
      });
  }));

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
    const compiled = <HTMLElement>fixture.debugElement.query(By.css('h2')).nativeElement;

    expect(compiled.textContent).toContain('Landing page');
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(1);
    expect(routerLinks[0].routerLink).toBe(AppRoutes.Details);
  });
}

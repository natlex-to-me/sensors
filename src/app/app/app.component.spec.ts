import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from '../app-routing.module';
import { AppModule } from '../app.module';
import { ProjectName } from '../core/constants';
import { RouterOutletStubComponent } from '../test/components/router-outlet-stub';
import { AppComponent } from './app.component';

let component: AppComponent = null;
let fixture: ComponentFixture<AppComponent> = null;

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
          RouterOutletStubComponent,
        ],
        imports: [
          AppModule,
          RouterTestingModule.withRoutes(
            routes,
          ),
        ],
      })
      .overrideModule(AppModule, {
        remove: {
          imports: [
            RouterModule,
          ],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      });
  }));

  tests();
});

function tests() {
  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
  });

  it('should render h1 tag', () => {
    const compiled = <HTMLElement>fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain(ProjectName);
  });
}

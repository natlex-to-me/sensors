import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterOutletStubComponent } from '../../../test/components/router-outlet-stub';
import { RouterLinkStubDirective } from '../../../test/router-link-stub.directive';
import { DetailsLazyLoadedModule } from '../../details.lazy-loaded.module';
import { routes } from '../../details.routes';
import { DetailsComponent } from './details.component';

let component: DetailsComponent = null;
let fixture: ComponentFixture<DetailsComponent> = null;

describe('DetailsComponent', () => {
  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        declarations: [
          DetailsComponent,
          RouterOutletStubComponent,
        ],
        imports: [
          DetailsLazyLoadedModule,
          RouterTestingModule.withRoutes(routes),
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
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  tests();
});

function tests() {
  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
  });
}

import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input() routerLink = '';

  constructor(
    private readonly _router: Router,
  ) {
  }

  @HostListener('click')
  onClick() {
    this._router.navigateByUrl(this.routerLink);
  }
}

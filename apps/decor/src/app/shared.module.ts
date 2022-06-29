import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [CommonModule]
})
export class SharedModule {
  /* 8 */
  static injector: Injector;

  constructor(injector: Injector) {
    SharedModule.injector = injector;
  }
}

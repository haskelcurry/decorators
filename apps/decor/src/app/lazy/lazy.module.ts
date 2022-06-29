import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      component: LazyComponent
    }])
  ],
  declarations: [LazyComponent]
})
export class LazyModule {}

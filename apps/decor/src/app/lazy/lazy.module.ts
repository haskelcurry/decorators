import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';

import { LazyComponent } from './lazy.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: LazyComponent
    }])
  ],
  declarations: [LazyComponent]
})
export class LazyModule {}

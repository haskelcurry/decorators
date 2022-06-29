import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SomeComponent } from './some.component';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, SomeComponent],
  /* 9 */
  imports: [BrowserModule, SharedModule, /* 20 */ RouterModule.forRoot([{
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then((m) => m.LazyModule)
  }])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

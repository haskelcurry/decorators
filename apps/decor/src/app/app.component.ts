import {
  Component,
  HostListener, Injector, InjectionToken
} from '@angular/core';
import { debounce } from 'lodash';
import { Log, MyService } from './app.service';
import { LibConfig } from './lib-config.decorator';
import { Level } from './logger.service';
import { OnLangChange, Translatable } from './translation';

/* 3 */
export function Debounce(milliseconds = 500): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = debounce(originalMethod, milliseconds);
  };
}

export type LibConfigInterface = any;
export const LIB_CONFIG = new InjectionToken<LibConfigInterface>('LIB_CONFIG');

/* 18 */
// @LibConfig({
//   version: 2,
//   theme: 'dark'
// })
/* 11 */
@Translatable()
@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /* 17 */
  providers: [{
    provide: LIB_CONFIG,
    useValue: {
      version: 1,
      theme: 'dark'
    }
  }]
})
export class AppComponent implements OnLangChange {
  /* 2 */
  @HostListener('document:scroll')
  /* 6 */
  @Debounce(250)
  @Log(Level.Info)
  scroll() {
    console.log('scroll');
  }

  /* 16 */
  selectedUser = 'some guy';

  ngOnLangChange(lang: string) {
    console.log('onLocaleChange!', lang);
  }

  constructor(
    private service: MyService,
    public injector: Injector
  ) {
    this.service.refreshData('test');
  }
}

/* 1 */
// Order of evaluation and execution
// from the TS docs
function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    /* 1.5. Communication Dec <-> Dec */
    // target.stage = 1;
    console.log('first(): called'/*, target, propertyKey, descriptor*/);
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // if (target.stage !== 1) throw new Error('@first() is required')
    // target.stage = 2;
    console.log('second(): called');
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

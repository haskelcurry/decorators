import {
  Component,
  HostListener, Injector
} from '@angular/core';
import { debounce } from 'lodash';
import { Log, MyService } from './app.service';
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

/* 11 */
@Translatable()
@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
// from the TS docs
function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('first(): called');
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('second(): called');
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

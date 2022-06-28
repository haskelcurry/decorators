import { Component, HostListener } from '@angular/core';
import { debounce } from 'lodash';
import { MyService } from './app.service';

export function Debounce(milliseconds = 500): MethodDecorator {
  return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    console.log(descriptor);
    
    const original = descriptor.value;
    descriptor.value = debounce(original, milliseconds);
  };
}

@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('document:scroll')
  @Debounce(250)
  scroll() {
    console.log('scroll');
  }

  constructor(private service: MyService) {}
}




// from the TS docs
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

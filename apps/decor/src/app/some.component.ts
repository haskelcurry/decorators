import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LIB_CONFIG, LibConfigInterface } from './app.component';
import { LibConfig } from './lib-config.decorator';
import { ObservableInput } from './observable-input';

type User = any;

/* 23 */
// But even if it is in the module, but the component is not used anywhere...
// @LibConfig({
//   test: true
// })
@Component({
  selector: 'some-component',
  template: `
    {{ selectedUser$ | async }}
    {{ config | json }}
  `,
})
export class SomeComponent {
  @Input('selectedUser') @ObservableInput()
  selectedUser$: Observable<User>;

  constructor(@Inject(LIB_CONFIG) protected config: LibConfigInterface) {}
}

/* 25.  Finale */

// Add Injection providers with Decorator

// Dependency Injection inside of Decorator

// Get access to the Component instance in Decorator

// Get access to the Injectable instance in Decorator

// Adding custom lifecycle hooks with help of Decorators

// Using Decorators with lazy loading

// Using Decorators in Microfrontends

// Using Ivy Engine's undocumented Component Features... with Decorators!

import { inject, Injectable, Injector } from '@angular/core';
import { LoggerService, Level } from './logger.service';
import { SharedModule } from './shared.module';
import { OnLangChange, Translatable } from './translation';

/* 16 */
@Translatable()
/* 3 */
@Injectable({ providedIn: 'root' })
export class MyService implements OnLangChange {
  @Log(Level.Info)
  refreshData(something: string) {}

  // Injector on 17
  constructor(public injector: Injector) {}

  @Log(Level.Info)
  ngOnLangChange(lang: string): void {
    console.log('Lang change in service!', lang);
  }
}

/* 4 */
// function Log(level: Level): MethodDecorator { 
//   return function logging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = (...args) => {
//       originalMethod(...args);

//       console.log(`%c@Log level ${level}: ${target.constructor.name}'s method '${propertyKey}' is called with arguments:`, `color: greenyellow`);
//       console.log(args);
//     };

//     return descriptor;
//   }
// }




/* 5 */ //  Now I want to inject certain service
// (although it's a little bit against the idea)
// (...still it makes sense)
//
// function Log(level: Level): MethodDecorator { 
//   return function logging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = (...args) => {
//       originalMethod(...args);
//       const logger = inject(LoggerService);
//       logger.log(level, `${target.constructor.name}'s method '${propertyKey}' is called with arguments: ${args.join(', ')}`);
//     };

//     return descriptor;
//   }
// }

//  5.5 -- !!!! Add to app.component.ts l51
//  It wouldn't work, because out of scope of injection


/* 7 */
/* 10 */
/*      NOW  WITH  STATIC  INJECTOR  */
//  EXTRACT TO OWN FILE
export function Log(level: Level): MethodDecorator { 
  return function logging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = (...args) => {
      originalMethod(...args);
      const logger = SharedModule.injector.get(LoggerService);
      logger.log(level, `${target.constructor.name}'s method '${propertyKey}' is called with arguments: ${args.join(', ')}`);
    };

    return descriptor;
  }
}

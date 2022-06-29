import { Subject } from 'rxjs';
import { 
  Injectable,
  Injector,
  ɵNG_PROV_DEF as NG_PROV_DEF,
} from '@angular/core';

/* 14 */
type Lang = string;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  onLangChange$ = new Subject<Lang>();

  setLang(lang: Lang) {
    this.onLangChange$.next(lang);
    // other stuff...
  }
}

/* 12 */
export type ConstructorFunction<T> = new (...args: any[]) => T;
export interface OnLangChange {
  injector: Injector;
  ngOnLangChange(lang: string): void;
}

export function Translatable() {
  return function translatable<T extends ConstructorFunction<OnLangChange>>(
    constructor: T
  ): any | void {
    // SKIP TO 13!!!!!!!!!!
    // TALK ABOUT THETA  (copy from opened tab)
    const injectable = constructor[NG_PROV_DEF];

    if (injectable) {
      // If it's an Injectable, hook into it's factory.

      const originalFactory = injectable.factory;

      injectable.factory = function (t) {
        const injected = originalFactory(t);

        const translationService = injected.injector.get(TranslationService);
        translationService.onLangChange$.subscribe((lang) =>
          injected.ngOnLangChange(lang)
        );

        return injected;   // NOW WE GOT AN INSTANCE OF SERVICE, TOO
      };
    } else {
      /* 13 THIS FIRST */
      // NOTE HOW WE OVERRIDE THE CONSTRUCTOR HERE, HOOKING INTO THE INSTANCE AND GETTING ACCESS TO "THIS"
      return class extends constructor {
        constructor(...args) {
          super(...args);

          const translationService = this.injector.get(TranslationService);

          console.log(translationService);

          translationService.onLangChange$.subscribe((lang) =>
            this.ngOnLangChange(lang)
          );
        }
      };
    }
  };
}

/* 15  Change it to OnConfigChange */

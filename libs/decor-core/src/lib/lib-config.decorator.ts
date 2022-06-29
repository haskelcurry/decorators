import { identity } from 'lodash';
import { InjectionToken, Type, ɵNG_COMP_DEF, ɵɵProvidersFeature as providersFeature } from '@angular/core';

export type LibConfigInterface = any;
export const LIB_CONFIG = new InjectionToken<LibConfigInterface>('LIB_CONFIG');

export function LibConfig(config: LibConfigInterface) {
  console.log(`LibConfig evaluated`, config);
  
  return (Class: any) => {
    const componentDef: any = Class[ɵNG_COMP_DEF];

    // If no providers specified, i.e. no providersFeature is present,
    // apply one manually.
    // More on feature:
    // https://github.com/angular/angular/blob/master/packages/core/src/render3/features/providers_feature.ts
    if (!componentDef.providersResolver) {
      providersFeature([])(componentDef);
    }
    // Take the original providers resolver
    const originalProvidersResolver = componentDef.providersResolver;

    componentDef.providersResolver = (def: any, processProvidersFn?: any) => {
      originalProvidersResolver(def, (providers: any[]) => {
        const processedProviders = (processProvidersFn || identity)(providers);
        return [
          ...processedProviders,
          // Add one more provider to the list
          { provide: LIB_CONFIG, useValue: config },
        ];
      });
    };
  };
}

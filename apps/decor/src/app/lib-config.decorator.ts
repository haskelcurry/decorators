import { identity } from 'lodash';
import { Type, ɵNG_COMP_DEF, ɵɵProvidersFeature as providersFeature } from '@angular/core';
import { LibConfigInterface, LIB_CONFIG } from './app.component';

/* 19 */
export function LibConfig(config: LibConfigInterface) {
  /* 22 */
  console.log(`LibConfig evaluated`, config);
  
  return (Class: Type<any>) => {
    const componentDef = Class[ɵNG_COMP_DEF];

    // If no providers specified, i.e. no providersFeature is present,
    // apply one manually.
    // More on feature:
    // https://github.com/angular/angular/blob/master/packages/core/src/render3/features/providers_feature.ts
    if (!componentDef.providersResolver) {
      providersFeature([])(componentDef);
    }
    // Take the original providers resolver
    const originalProvidersResolver = componentDef.providersResolver;

    componentDef.providersResolver = (def, processProvidersFn?) => {
      originalProvidersResolver(def, (providers) => {
        const processedProviders = (processProvidersFn || identity)(providers);
        return [
          ...processedProviders,
          // Add one more provider to the list
          { provide: LIB_CONFIG, useValue: config },
          /* 20 */
          // { provide: COMPONENT_APPLIED_ON, useClass: Class },
        ];
      });
    };
  };
}

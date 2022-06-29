import { Component } from '@angular/core';
import { LibConfig } from '@decor/core';

@LibConfig({
  mfe: true
})
@Component({
  selector: 'test-plugin-entry',
  template: `<test-nx-welcome></test-nx-welcome>`,
})
export class RemoteEntryComponent {}

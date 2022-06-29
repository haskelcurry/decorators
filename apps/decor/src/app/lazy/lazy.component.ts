import { Component } from '@angular/core';
import { LibConfig } from '../lib-config.decorator';

/* 21 */
@LibConfig({
  version: 1,
  theme: 'light',
  lazy: true
})
@Component({
  selector: 'lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
})
export class LazyComponent {
}

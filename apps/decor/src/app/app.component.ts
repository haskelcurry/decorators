import { Component, HostListener } from '@angular/core';
import { MyService } from './app.service';

@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('document:scroll')
  scroll() {
    console.log('scroll');
  }

  constructor(private service: MyService) {}
}

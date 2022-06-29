import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableInput } from './observable-input';

type User = any;

@Component({
  selector: 'some-component',
  template: `
    {{ selectedUser$ | async }}
  `,
})
export class SomeComponent implements OnInit {
  @Input('selectedUser') @ObservableInput()
  selectedUser$: Observable<User>;

  ngOnInit(): void {
  }
}

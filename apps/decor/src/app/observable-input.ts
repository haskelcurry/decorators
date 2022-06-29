// Later
import { ReplaySubject } from 'rxjs';

// Start here
const subjects = new Map<Object, ReplaySubject<any>>();

export function ObservableInput<T>(): PropertyDecorator {
  return (target, propertyKey) => {
    delete target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set(value) {
        // Will be called on @Input() change
        let subject: ReplaySubject<T> = subjects.get(this);
        if (!subject)  {
          subject = new ReplaySubject<T>(1);
          subjects.set(this, subject);
        }
        subject.next(value);
      },
      get() {
        // Will be called when getting the bound input prop in the component class
        let subject: ReplaySubject<T> = subjects.get(this);
        return subject;
      },
    })
  }
}

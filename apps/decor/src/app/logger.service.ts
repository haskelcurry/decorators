import { Injectable } from '@angular/core';

export enum Level {
  Info = 'Info',
  Warn = 'Warn'
};

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(level: Level, text: string) {
    console.log(`%c@Log level ${level}: ${text}`, `color: greenyellow`);
  }
}

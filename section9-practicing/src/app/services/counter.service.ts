import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private activeToInactiveCounter = 0;
  private inactiveToInactiveCouner = 0;

  incrementActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log('Active to inactive counter = ' + this.activeToInactiveCounter);
  }

  incrementInactiveToActive() {
    this.inactiveToInactiveCouner++;
    console.log('Inactive to active counter = ' + this.inactiveToInactiveCouner);
  }

  constructor() { }
}

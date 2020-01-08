import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedEmiter = new EventEmitter<boolean>();
  constructor() { }
}

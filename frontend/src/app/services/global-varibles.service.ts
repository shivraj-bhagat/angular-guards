import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariblesService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem("logout") == "true" ? true : false);
  constructor() {}

  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }
}

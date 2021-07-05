import { User } from './../../assets/models/User';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate = (user : User) : Observable<Boolean> => {
    const auth = user.email === 'amine@gmail.com' && user.password === 'amine123';
    return of(auth);
  }
}

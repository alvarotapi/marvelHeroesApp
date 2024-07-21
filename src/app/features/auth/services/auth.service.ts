import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../interfaces/user.interface';
import { userData } from '../../../assets/data/user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: User;
  private registeredUsers: User[] = userData;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    this.registeredUsers.forEach((user) => {
      if (user.email === email && user.password === password) {
        this.user = user;
        localStorage.setItem('token', `${this.user?.username}-asd24236fsdf`);
        this.router.navigateByUrl('marvel-list');
      }
    });
  }

  logout() {
    this.router.navigateByUrl('login');
    this.user = undefined;
    localStorage.clear();
  }
}

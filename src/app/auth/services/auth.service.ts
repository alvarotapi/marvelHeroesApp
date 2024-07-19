import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../interfaces/user.interface';

const userData: User[] = [
  {
    id: 1,
    username: 'test',
    email: 'test@test.com',
    password: '123456',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: User;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    userData.forEach((user) => {
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

import { Injectable } from '@angular/core';
import { User } from '../models/user.model'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  user: User | undefined | null;
  
  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  loadLocalUser() {
    const localUser = localStorage.getItem('user');
    if (localUser) 
      this.setUser(JSON.parse(localUser!) as User);
  }

  login(user: User) {
    this.setUser(user);
    this.router.navigate(['/']);
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private setUser(user: User) {
    this.user = user;
    this.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  
}

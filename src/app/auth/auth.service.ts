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

  setUser(user: User) {
    this.user = user;
    this.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigate(['/']);
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // login(email: string){
  //   const body = {email: email};
  //   const response = this.http.post(signInURL, body);
  //   if (response) { 
  //     this.router.navigate(['/homepage']);
  //   }
  //   return response;
  // }

}

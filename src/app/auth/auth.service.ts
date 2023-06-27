import { Injectable } from '@angular/core';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = true;
  user: User | undefined | null;
  
  constructor() { }

  isAuthenticated(): boolean{
    return this.isLoggedIn;
  }

  getUser(){
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')!);
      this.setUser(user.email, user.name, user.surname);
    }
  }

  setUser(email: string, name: string, surname: string){
    this.user = new User(email, name, surname);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.isLoggedIn = true;
  }

  // login(email: string){
  //   const body = {email: email};
  //   const response = this.http.post(signInURL, body);
  //   if (response) { 
  //     this.router.navigate(['/homepage']);
  //   }
  //   return response;
  // }

  logout(){
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem('user');
    //this.router.navigate(['/login']);
  }

}

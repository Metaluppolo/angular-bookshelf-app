import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  userControl = new FormControl<User | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getUsers().subscribe((data: any) => {
      this.users = Object.keys(data).map((key) => {
        return data[key];
      })
    });
    // INIZIO TEST 
    if (this.users.length < 1) {
      this.users = [
        {email: 'luca.rossi@test.com', name: 'Luca', surname: 'Rossi'},
        {email: 'anna.verdi@test.com', name: 'Anna', surname: 'Verdi'},
        {email: 'carlo.neri@test.com', name: 'Carlo', surname: 'Neri'},
      ];
    }
    // FINE TEST
  }

  onSelectionChange(event: MatSelectChange) {
    const data = event.value;
    if (!data) {
      this.authService.logout();
      return;
    }
    this.authService.setUser(data);
  }
  
  // onSubmit(form: NgForm){
  //   const email = form.value.email;
  //   this.authService.login(email).subscribe((data: any) => {
  //     this.authService.setUser(data.email, data.nome, data.cognome);
  //   })
  // }
}

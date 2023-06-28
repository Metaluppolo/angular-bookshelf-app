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
  selectedUser: User | undefined;
  userControl = new FormControl<User | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getUsers().subscribe((res: any) => {
      const data = res.data;
      this.users = Object.keys(data).map((key) => { return data[key] });
    });
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectedUser = event.value;
  }
  
  onLoginClick() {
    if(this.selectedUser)
      this.authService.login(this.selectedUser);
  }

}

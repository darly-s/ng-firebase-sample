import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserLoginModel } from 'src/app/shared/models/user-login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public form: FormGroup;
  public userLogin: UserLoginModel

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  public async onSubmit() {
    this.userLogin = {
      email: this.form.value.email,
      password: this.form.value.password
    } ;
    
    await this.authService.signIn(this.userLogin);
    this.router.navigate(['/system/home']);
  }
  public async googleAuth() {
    await this.authService.googleAuth();
    this.router.navigate(['/system/home']);
  }
}

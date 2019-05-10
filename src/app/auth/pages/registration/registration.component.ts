import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserRegistrationModel } from 'src/app/shared/models/user-registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup;
  public newUser: UserRegistrationModel;
  
  constructor(
    private authServise: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email':  new FormControl(null, [Validators.required, Validators.email]),
      'password':  new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name':  new FormControl(null, [Validators.required]),
      'agree':  new FormControl(false, [Validators.requiredTrue])
    })
  }

  public async onSubmit() {
    this.newUser = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
    await this.authServise.signUp(this.newUser);
    this.router.navigate(['verify-email-address']);
  }
  public async googleAuth() {
   await this.authServise.googleAuth();
   this.router.navigate(['/system/home']);
  }

}

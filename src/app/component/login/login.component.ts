import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  constructor(
    private _lService: LoginService,
    private _auth: AuthService,
    private _router: Router) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.LoginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    console.log(this.LoginForm.value);
    this._lService.userlogin(this.LoginForm.value)
      .subscribe((r) => {

      });
    this._lService.userLoginGet()
      .subscribe((r) => {

      });
      this._auth.setRole = "HR";
    this._router.navigate(['dashboard']);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router } from '@angular/router';
import { LoginServiceHttp } from '../../shared/services/login.service.http';
import { Login } from '../../shared/models/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { constantsParameter } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginUserForm: FormGroup;

  constructor(private dialog: MatDialog,
              private router: Router,
              private service: LoginServiceHttp,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginUserForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.componentInstance.LogIn.subscribe(resultForm => {
      if (resultForm) {
      }
    });
  }

  onSubmit() {
    if (this.loginUserForm.invalid) {
      alert('Username or password are required');
    }

    if (!this.loginUserForm.invalid) {
      this.logIn(new Login(this.formControls.userName.value, this.formControls.userPassword.value));
    }
  }

  logIn(user: Login) {
    this.service.post(user).subscribe((response: any) => {
      localStorage.setItem('user', user.username);
      const d: Date = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      const decoded = jwt_decode(response.token);
      constantsParameter.CURRENT_USER = decoded;
      document.cookie = `token=${response.token}; expires=${d.toUTCString()} path=${''}`;
      document.cookie = `companyId=${constantsParameter.CURRENT_USER.CompanyId}; expires=${d.toUTCString()} path=${''}`;
      this.router.navigate(['/']);
    }, () => {
      this.clearLoginForm();
      alert('Invalid username or password');
    });
  }

  clearLoginForm() {
    this.loginUserForm.clearValidators();
    this.loginUserForm.reset();
  }

  get formControls() { return this.loginUserForm.controls; }

}

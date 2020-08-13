import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  logInForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  @Output() LogIn = new EventEmitter<boolean>();

  constructor(public dialogRefLogIn: MatDialogRef<LoginFormComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRefLogIn.close();
  }

  onOkClick() {

  }

}

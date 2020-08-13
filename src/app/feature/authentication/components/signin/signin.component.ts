import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceHttp {

  private header = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  public readonly URL_LOGIN = `${environment.endpoint}/auth`;

  constructor(private http: HttpClient) { }


post(login: Login) {
  return this.http.post(`${this.URL_LOGIN}/authenticate`,
  login, { headers: this.header });
}


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceHttp {

  public readonly URL_PAYMENT = `${environment.endpoint}/CostcoCom`;

  constructor(private http: HttpClient) { }

  add(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.URL_PAYMENT}/uploadfile`, formData);
  }

}

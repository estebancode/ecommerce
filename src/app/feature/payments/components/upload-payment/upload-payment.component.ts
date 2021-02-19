import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentServiceHttp } from '../../shared/services/payment.service.http';

@Component({
  selector: 'app-upload-payment',
  templateUrl: './upload-payment.component.html',
  styleUrls: ['./upload-payment.component.scss']
})
export class UploadPaymentComponent implements OnInit {


  fileToUpload: File = null;
  public documentFormat: Array<string> = ['csv'];
  templatePayments = environment.paymentTemplate;
  @ViewChild('fileUploader', {static: false}) fileUploader: ElementRef;

  constructor(private paymentServiceHttp: PaymentServiceHttp) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    if (this.validateFileFormat(files.item(0))) {
      this.fileToUpload = files.item(0);
    } else {
      alert('the file extension is incorrect');
    }
  }

  validateFileFormat(file: File): boolean {
    const typeFile = file.name.split('.').pop();
    if (!this.documentFormat.includes(typeFile)) {
      return false;
    } else {
       return true;
    }
}

  onSubmit(){
    if (this.fileToUpload != null) {
      this.fileUploader.nativeElement.value = null;
      this.paymentServiceHttp.add(this.fileToUpload).subscribe(()=> {
        alert('Successfully uploaded');
      });
    } else {
      alert('Required CSV file');
    }
  }

}

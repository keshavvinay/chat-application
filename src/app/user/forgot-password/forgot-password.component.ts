import { AppService } from 'src/app/app.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  onSubmit(form : NgForm){
    this.appService.forgotPasswordFunction(form.value).subscribe(apiResponse => {
      console.log(apiResponse)
    })
  }
  constructor(public appService : AppService) { }

  ngOnInit(): void {
  }

}

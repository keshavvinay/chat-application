import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  phoneNumber : any;

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn
  
  public onSignup : any = (form : NgForm) => {
    console.log(form.value)
    this.appService.signupFunction(form.value).subscribe( apiResponse => {
      if(apiResponse.status == 200){
        this.toastr.success('SignUP Successful')
        setTimeout(() => {
          this.goToSignIn();
        }, 2000)
      }
    })
  }

  constructor(public appService : AppService, public toastr : ToastrService, public router : Router) { }

  ngOnInit(): void {
  }

}

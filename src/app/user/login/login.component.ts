import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public goToSignUp: any = () => {

    this.router.navigate(['/signup']);

  } // end goToSignUp

  public onLogin: any = (form: NgForm) => {
    console.log(form.value)
    this.appService.loginFunction(form.value).subscribe(apiResponse => {
      console.log(apiResponse)
      if (apiResponse.status === 200) {
        this.cookie.set('authtoken', apiResponse.data.authToken);
        this.cookie.set('receiverId', apiResponse.data.userDetails.userId);
        console.log(apiResponse.data)
        this.cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
        this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)

        this.router.navigate(['/chat']);
        setTimeout(() => {
          this.toastr.success('Login Succesful')
        }, 1000)
      }
      else {
        this.toastr.error(apiResponse.error.message)
      }
    }, (err) => {
      console.log(err)
      this.toastr.error(err.error.message)
    })
  }

  constructor(public appService: AppService, public toastr: ToastrService, public router: Router, public cookie: CookieService) { }

  ngOnInit(): void {
  }

}

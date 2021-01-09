import { AppService } from 'src/app/app.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
   token: string;

  onConfirm(form: NgForm) {
    let data = {password : form.value.password, token : this.token}
    console.log(data)
    this.appService.resetPassword(data).subscribe(apiResponse => {
      console.log(apiResponse)
    })
  }
  constructor(public route: ActivatedRoute, public appService : AppService) { }

  ngOnInit(): void {
     this.token = this.route.snapshot.queryParamMap.get('token');
  }

}

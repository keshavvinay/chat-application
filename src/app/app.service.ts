import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url =  'http://localhost:3000';

  constructor(public http: HttpClient, public cookie : CookieService) { }

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('userName', data.userName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)

      console.log(params)

    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  } // end of signupFunction function.

  public loginFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of loginFunction function.

  public forgotPasswordFunction(data): Observable<any>{
    const params = new HttpParams()
    .set('email', data.email)
    return this.http.post(`${this.url}/api/v1/users/forgotpassword`,params)
  }

  public resetPassword(data) : Observable<any>{
    const params = new HttpParams()
    .set('password', data.password)
    .set('token', data.token)
    return this.http.post(`${this.url}/api/v1/users/resetpassword`,params)
  }
  
  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', this.cookie.get('authtoken'))

    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function

}

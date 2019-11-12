import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  url = 'https://doctors.auth.us-east-1.amazoncognito.com/login?client_id=7n72piftvf229os6caqsgi4sqr&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=Doctors://'; 
  constructor(private http: HttpClient) { }
  getLogin(){
    return this.http.get(`${this.url}`);
  }
}

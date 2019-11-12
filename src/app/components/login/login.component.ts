import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private cognitoService:CognitoService) { }

  ngOnInit() {
    
  }
}

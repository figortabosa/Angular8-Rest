import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {login: '', senha: ''};

  constructor(private LoginService: LoginServiceService, private router: Router){}

  public login() {
  this.LoginService.login(this.usuario);
  }

  public recuperar() {
    this.LoginService.recuperar(this.usuario.login);
  }


  ngOnInit() {
    if (localStorage.getItem('token') !== null &&
        localStorage.getItem('token').toString().trim() !== null) {
          this.router.navigate(['home']);
        }
  }

}

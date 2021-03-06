import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Token } from '@angular/compiler';
import {Router} from '@angular/router';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }


  recuperar(login) {

    let user = new Usuario();
    user.login = login;

    return this.http.post(AppConstants.getBaseUrlPath + 'recuperar/', user).subscribe(data => {

    alert( JSON.parse(JSON.stringify(data)).error);


    },
    error => {
      console.error("Erro ao recuperar login ");
      alert('Erro ao recuperar login!')
    }
    );
  }

  login(usuario) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

    var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
     localStorage.setItem("token", token);

    console.info("Token: " + localStorage.getItem("token"));

        this.router.navigate(['home']);

    },
    error => {
      console.error("Erro ao tentar se logar");
      alert('Acesso negado!')
    }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Usuario } from '../model/usuario';
import { UserReport } from '../model/usuario-report';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }

  getUsuarioList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getProfissaoList(): Observable<any> {
    return this.http.get<any>(AppConstants.getBaseUrlPath + 'profissao/');
  }

  getUsuarioListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  deleteUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }

  consultarUser(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);
  }

  consultarUserPorId(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  salvarUsuario(usuario) : Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, usuario);
  }

  atualisarUsuario(usuario) : Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, usuario);
  }

  userAutenticado(){
    if (localStorage.getItem('token') !== null &&
    localStorage.getItem('token').toString().trim() !== null) {
      return true;
    }else {
      return false;
    }
  }

  removerTelefone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "removerTelefone/" + id,{responseType: 'text'});
  }

  downloadPdfRelatorio() {
    return this.http.get(AppConstants.baseUrl + 'relatorio',{responseType : 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelatorioParam(userreport : UserReport) {
    return this.http.post(AppConstants.baseUrl + 'relatorio/', userreport ,{responseType : 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  carregarGrafico() : Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'grafico');
  }
}

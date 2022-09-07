import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const apiUrlUsuario = environment.apiUrl + "Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private router: Router, private http: HttpClient) { }

  logar(usuario: IUsuario): Observable<any> {
    return this.mockLogin(usuario).pipe(tap((resposta) => {
      if(!resposta.sucesso) return;
      localStorage.setItem('token', btoa(JSON.stringify('TokenQueSeriaGeradoPelaAPI')));
      localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
      this.router.navigate(['']);
    }))
  }

  mockLogin(usuario: IUsuario): Observable<any> {
    var retornoMock: any = [];

    if(usuario.email === 'hello@gmail.com' && usuario.senha == '123') {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = 'TokenQueSeriaGeradoPelaAPI';
      return of(retornoMock);
    }

    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): IUsuario {
    return localStorage.getItem('usuario') ? JSON.parse(atob(localStorage.getItem('usuario') || "{}")) : null;
  }

  get obterTokenUsuario(): IUsuario {
    return localStorage.getItem('token') ? JSON.parse(atob(localStorage.getItem('token') || "{}")) : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}

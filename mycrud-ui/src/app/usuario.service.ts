import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from './login';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

const domain = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private auth = 'v1/auth/authenticate'
  private userToken = 'v1/auth/validateUserToken'

  constructor(private http: HttpClient, private router:Router) { }

  login(login: login): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(domain+this.auth, login, {headers: { 'login': 'skip-this-request' }})
        .subscribe({
          next: resp => resolve(resp)
        });
    })
  }

  fetchUser() :Promise<Usuario>{
    return new Promise((resolve, reject) => {
      this.http.get<Usuario>(domain+this.userToken)
        .subscribe({
          next: resp => resolve(resp),
          error: (err) => reject(err)
        })
    })
  }
}

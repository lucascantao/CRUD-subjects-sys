import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Controle } from './controle';
import { environment } from '../environments/environment';
import { ControleDTO } from './dto/controle.dto';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  
  private URL = 'v1/subject';
  private domain = environment.serverUrl;
  
  constructor(private http: HttpClient) { }

  getControle(id:number) {
    return this.http.get<ControleDTO>(`${this.domain}${this.URL}`, {params: new HttpParams().set('id', id)});
  }

  getListControle(ano: string, page: number): Observable<any> {

    const options = { params: new HttpParams().set('ano', ano).set('page', page)};

    return this.http.get<any>(`${this.domain}${this.URL}/ano`, options);
  }

  addControle(controle: Controle) {
    return this.http.post<Controle>(`${this.domain}${this.URL}`, controle, {observe: "body"});
  }

  saveControle(controle: ControleDTO) {
    console.log(controle)
    return this.http.put<ControleDTO>(`${this.domain}${this.URL}`, controle);

  }
}

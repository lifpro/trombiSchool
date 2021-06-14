import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etudiant } from '../model/etudiant';
@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {
  apiUrl: string = "http://192.168.12.112:8080/api-sc/"
  constructor(protected http: HttpClient) { }

  protected baseOption() {
    const _h = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers: _h }
  }

  public findAll() {
    let url = encodeURI(this.apiUrl + "/tiers/");
    return this.http.get(url, this.baseOption()).pipe(catchError(this.handleError))
  }

  public save(e: Etudiant) {
    let url = encodeURI(this.apiUrl + "/tiers/");
    return this.http.post(url, JSON.stringify(e), this.baseOption()).
      pipe(catchError(this.handleError))
  }

  public update(id: number, e: Etudiant) {
    let url = encodeURI(this.apiUrl + "/tiers/" + id);
    return this.http.put(url, JSON.stringify(e), this.baseOption()).
      pipe(catchError(this.handleError))
  }
  public delete(id: number) {
    let url = encodeURI(this.apiUrl + "/tiers/" + id);
    return this.http.delete(url, this.baseOption()).
      pipe(catchError(this.handleError))
  }
  protected handleError(error) {
    return throwError(error);
  }
}

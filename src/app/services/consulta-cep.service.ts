import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  API_url = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  getConsultaCep(cep: string) {
    return this.http.get(`${this.API_url}${cep}/json`)
  }
}

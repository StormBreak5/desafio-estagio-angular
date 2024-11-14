import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, finalize, Observable, throwError} from "rxjs";
import {Cliente} from "../models/cliente";
import {Endereco} from "../models/endereco";
import {AppStateService} from "./app-state.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl: string = 'http://localhost:8081/clientes';

  constructor(
    private http: HttpClient,
    private appState: AppStateService,
    private _snackBar: MatSnackBar
  ) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro';
    if(error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
    }

    this.appState.setError(errorMessage);
    this._snackBar.open(errorMessage, 'ok');
    return throwError(errorMessage);
  }

  getClientes(): Observable<{content: Cliente[]}> {
    this.appState.setLoading(true);
    return this.http.get<{content: Cliente[]}>(`${this.apiUrl}`).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.appState.setLoading(false))
    );
  }

  getClienteById(id: number): Observable<Cliente> {
    this.appState.setLoading(true);
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.appState.setLoading(false))
    );
  }

  criarCliente(cliente: Cliente): Observable<Cliente> {
    this.appState.setLoading(true);
    return this.http.post<Cliente>(this.apiUrl, cliente).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.appState.setLoading(false))
    );
  }

  atualizaCliente(cliente: Cliente): Observable<Cliente> {
    this.appState.setLoading(true);
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente).pipe(
      catchError(error => {
        this.appState.setError('Erro ao atualizar cliente');
        this._snackBar.open(error.message, 'ok');
        return throwError(error);
      }),
      finalize(() => this.appState.setLoading(false))
    );
  }

  deletaCliente(id: number): Observable<Cliente> {
    this.appState.setLoading(true);
    return this.http.delete<Cliente>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.appState.setLoading(false))
    );
  }

  adicionaEndereco(idCliente: number, endereco: Endereco): Observable<Endereco> {
    this.appState.setLoading(true);
    return this.http.post<Endereco>(`${this.apiUrl}/${idCliente}/enderecos`,endereco).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.appState.setLoading(false))
    );
  }

  atualizaEndereco(idCliente: number, endereco: Endereco): Observable<Endereco> {
    this.appState.setLoading(true);
    return this.http.put<Endereco>(`${this.apiUrl}/${idCliente}/enderecos/${endereco.idEndereco}`, endereco).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.appState.setLoading(false))
    );
  }

  deletaEndereco(clienteId: number, enderecoId: number): Observable<void> {
    this.appState.setLoading(true);
    return this.http.delete<void>(`${this.apiUrl}/${clienteId}/enderecos/${enderecoId}`).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.appState.setLoading(false))
    );
  }
}

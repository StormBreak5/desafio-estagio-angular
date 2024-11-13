import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../../services/client.service";
import {HttpClient} from "@angular/common/http";
import {throwError} from "rxjs";

@Component({
  selector: 'app-importar-clientes',
  templateUrl: './importar-clientes.component.html',
  styleUrls: ['./importar-clientes.component.css']
})
export class ImportarClientesComponent {
  file: File | null = null;

  constructor(private http: HttpClient, private clienteService: ClientService) {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if(file) {
      this.file = file;
    }
  }

  onUpload() {
    if(this.file) {
      const formData = new FormData();

      formData.append('file', this.file);

      const upload$ = this.http.post('https://localhost:8081/clientes/importaPF', formData);

      upload$.subscribe({
        next: () => {
         this.clienteService.getClientes();
        },
        error: (error: any) => {
          return throwError(error);
        }
      })
    }
  }
}

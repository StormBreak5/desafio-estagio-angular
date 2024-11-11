import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClientService} from "../../../services/client.service";
import {MatDialog} from "@angular/material/dialog";
import {TipoPessoa} from "../../../models/enum/tipo-pessoa";
import {EditaClienteModalComponent} from "../edita-cliente-modal/edita-cliente-modal.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientesPF: Cliente[] = [];
  clientesPJ: Cliente[] = [];

  constructor(
    private clienteService: ClientService,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.carregaClientes();
  }

  carregaClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      const clienteTratado = clientes.content;
      this.clientesPF = clienteTratado.filter(c => c.tipoPessoa === TipoPessoa.FISICA);
      this.clientesPJ = clienteTratado.filter(c => c.tipoPessoa === TipoPessoa.JURIDICA);
    })
  }

  editarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditaClienteModalComponent, {
      width: '600px',
      height: 'auto',
      data: cliente,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.carregaClientes();
      }
    })
  }

  exportaClientesPFPDF(): void {
    this.http.get('http://localhost:8081/relatorios/clientes/pdf', {responseType: 'blob'}).subscribe(result => {
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientesPF.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Erro ao exportar clientes: ', error);
    });
  }

  exportaClientesPJPDF(): void {
    this.http.get('http://localhost:8081/relatorios/clientes/pdfPJ', {responseType: 'blob'}).subscribe(result => {
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientesPJ.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Erro ao exportar clientes: ', error);
    });
  }

  exportaClientesPFExcel(): void {
    this.http.get('http://localhost:8081/relatorios/clientes/excel', {responseType: 'blob'}).subscribe(result => {
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientesPF.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Erro ao exportar clientes: ', error);
    });
  }

  exportaClientesPJExcel(): void {
    this.http.get('http://localhost:8081/relatorios/clientes/excelPJ', {responseType: 'blob'}).subscribe(result => {
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientesPJ.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Erro ao exportar clientes: ', error);
    });
  }

  deletarCliente(cliente: Cliente): void {
    if(confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deletaCliente(cliente.id!).subscribe(() => {
        this.carregaClientes();
      });
    }
  }
}

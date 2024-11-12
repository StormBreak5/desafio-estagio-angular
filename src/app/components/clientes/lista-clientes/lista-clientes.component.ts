import {Component, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClientService} from "../../../services/client.service";
import {MatDialog} from "@angular/material/dialog";
import {TipoPessoa} from "../../../models/enum/tipo-pessoa";
import {EditaClienteModalComponent} from "../edita-cliente-modal/edita-cliente-modal.component";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientesPF = new MatTableDataSource<Cliente>();
  clientesPJ = new MatTableDataSource<Cliente>();
  filterText: string = '';

  @ViewChild(MatSort) sort!: MatSort;

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
      this.clientesPF.data = clienteTratado.filter(c => c.tipoPessoa === TipoPessoa.FISICA);
      this.clientesPJ.data = clienteTratado.filter(c => c.tipoPessoa === TipoPessoa.JURIDICA);
      this.clientesPF.sort = this.sort;
      this.clientesPJ.sort = this.sort;
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

  get filtroClientesPF(): Cliente[] {
    this.clientesPF.filter = this.filterText.trim().toLowerCase();
    return this.clientesPF.filteredData;
  }

  get filtroClientesPJ(): Cliente[] {
    this.clientesPJ.filter = this.filterText.trim().toLowerCase();
    return this.clientesPJ.filteredData;
  }
}

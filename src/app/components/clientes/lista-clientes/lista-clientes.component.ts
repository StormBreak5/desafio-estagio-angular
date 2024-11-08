import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClientService} from "../../../services/client.service";
import {MatDialog} from "@angular/material/dialog";
import {TipoPessoa} from "../../../models/enum/tipo-pessoa";
import {EditaClienteModalComponent} from "../edita-cliente-modal/edita-cliente-modal.component";

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

  deletarCliente(cliente: Cliente): void {
    if(confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deletaCliente(cliente.id!).subscribe(() => {
        this.carregaClientes();
      });
    }
  }
}

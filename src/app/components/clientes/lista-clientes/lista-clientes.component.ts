import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClientService} from "../../../services/client.service";
import {MatDialog} from "@angular/material/dialog";
import {TipoPessoa} from "../../../models/enum/tipo-pessoa";

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
      this.clientesPF = clientes.filter(c => c.tipoPessoa === TipoPessoa.FISICA);
      this.clientesPJ = clientes.filter(c => c.tipoPessoa === TipoPessoa.JURIDICA);
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

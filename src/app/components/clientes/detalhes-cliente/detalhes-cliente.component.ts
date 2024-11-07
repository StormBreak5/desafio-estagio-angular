import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {MatDialog} from "@angular/material/dialog";
import {Endereco} from "../../../models/endereco";
import {CriaEnderecoComponent} from "../../enderecos/cria-endereco/cria-endereco.component";

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.css']
})
export class DetalhesClienteComponent implements OnInit {
  cliente!: Cliente;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregaCliente(id);
  }

  carregaCliente(id: number): void {
    this.clienteService.getClienteById(id).subscribe(cliente => {
      this.cliente = cliente;
    })
  }

  adicionaEndereco(): void {
    const dialogRef = this.dialog.open(CriaEnderecoComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.clienteService.adicionaEndereco(this.cliente.id!, result).subscribe(() => {
          this.carregaCliente(this.cliente.id!);
        });
      }
    });
  }

  editaEndereco(endereco: Endereco): void {
    const dialogRef = this.dialog.open(CriaEnderecoComponent, {
      width: '600px',
      data: {
        endereco
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.clienteService.atualizaEndereco(this.cliente.id!, {...result, id: endereco.id}).subscribe(() => {
          this.carregaCliente(this.cliente.id!);
        });
      }
    });
  }

  deletarEndereco(endereco: Endereco): void {
    if(confirm('Tem certeza que deseja excluir este endereço?')) {
      this.clienteService.deletaEndereco(this.cliente.id!, endereco.id!).subscribe(() => {
        this.carregaCliente(this.cliente.id!);
      })
    }
  }
}

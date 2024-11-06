import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {MatDialog} from "@angular/material/dialog";

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

}

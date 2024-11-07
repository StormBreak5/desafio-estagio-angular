import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { CriarClienteComponent } from './components/clientes/criar-cliente/criar-cliente.component';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import { DetalhesClienteComponent } from './components/clientes/detalhes-cliente/detalhes-cliente.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { CriaEnderecoComponent } from './components/enderecos/cria-endereco/cria-endereco.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    CriarClienteComponent,
    ListaClientesComponent,
    DetalhesClienteComponent,
    CriaEnderecoComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

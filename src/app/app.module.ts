import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { CriarClienteComponent } from './components/clientes/criar-cliente/criar-cliente.component';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import { DetalhesClienteComponent } from './components/clientes/detalhes-cliente/detalhes-cliente.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { CriaEnderecoComponent } from './components/enderecos/cria-endereco/cria-endereco.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpClientModule} from "@angular/common/http";
import { EditaClienteModalComponent } from './components/clientes/edita-cliente-modal/edita-cliente-modal.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSliderModule} from "@angular/material/slider";
import {NgxMaskModule} from "ngx-mask";
import {MatSortModule} from "@angular/material/sort";


const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ListaClientesComponent},
  {path: 'clientes/novo', component: CriarClienteComponent},
  {path: 'clientes/:id', component: DetalhesClienteComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    CriarClienteComponent,
    ListaClientesComponent,
    DetalhesClienteComponent,
    CriaEnderecoComponent,
    EditaClienteModalComponent
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
    MatCheckboxModule,
    MatSelectModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgxMaskModule.forRoot(),
    MatSortModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

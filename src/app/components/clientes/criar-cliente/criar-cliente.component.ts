import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoPessoa} from "../../../models/enum/tipo-pessoa";
import {ClientService} from "../../../services/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-criar-cliente',
  templateUrl: './criar-cliente.component.html',
  styleUrls: ['./criar-cliente.component.css']
})
export class CriarClienteComponent {

  formCliente: FormGroup;
  tipoPessoa = TipoPessoa;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientService,
    private router: Router
  ) {
    this.formCliente = this.formBuilder.group({
      tipoPessoa: [TipoPessoa.FISICA, Validators.required],
      cpfCnpj: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nome:[''],
      razaoSocial:[''],
      rg: [''],
      inscricaoEstadual: [''],
      dataNascimento: [null as Date | null],
      dataCriacao:[null as Date | null]
    });

    this.formCliente.get('tipoPessoa')?.valueChanges.subscribe(value => {
      this.updateFormValidators(value);
    })
  }

  updateFormValidators(tipoPessoa: TipoPessoa): void {
    if(tipoPessoa === TipoPessoa.FISICA) {
      this.formCliente.get('nome')?.setValidators(Validators.required);
      this.formCliente.get('rg')?.setValidators(Validators.required);
      this.formCliente.get('dataNascimento')?.setValidators(Validators.required);
      this.formCliente.get('razaoSocial')?.clearValidators();
      this.formCliente.get('inscricaoEstadual')?.clearValidators();
      this.formCliente.get('dataCriacao')?.clearValidators();
    } else {
      this.formCliente.get('nome')?.clearValidators();
      this.formCliente.get('rg')?.clearValidators();
      this.formCliente.get('dataNascimento')?.clearValidators();
      this.formCliente.get('razaoSocial')?.setValidators(Validators.required);
      this.formCliente.get('inscricaoEstadual')?.setValidators(Validators.required);
      this.formCliente.get('dataCriacao')?.setValidators(Validators.required);
    }

    this.formCliente.updateValueAndValidity();
  }

  onSubmit(): void {
    if(this.formCliente.valid) {
      this.clienteService.criarCliente(this.formCliente.value).subscribe(
        (novoCliente) => {
          this.router.navigate(['/clientes', novoCliente.id]);
        },
        (error) => {
          console.error('Erro ao criar cliente: ', error);
        }
      );
    }
  }
}

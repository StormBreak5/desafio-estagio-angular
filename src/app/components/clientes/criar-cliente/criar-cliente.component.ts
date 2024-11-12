import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      tipoPessoa: [TipoPessoa.FISICA],
      cpfCnpj: ['', [Validators.required, this.validaCPFCNPJ]],
      email: ['', [Validators.required, Validators.email]],
      nome:[''],
      razaoSocial:[''],
      rg: [''],
      inscricaoEstadual: [''],
      dataNascimento: [null],
      dataCriacao:[null],
      ativo: true
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
      this.formCliente.get('cpfCnpj')?.setValidators(Validators.required);
      this.formCliente.get('email')?.setValidators(Validators.required);
      this.formCliente.get('tipoPessoa')?.setValidators(Validators.required);
      this.formCliente.get('razaoSocial')?.clearValidators();
      this.formCliente.get('inscricaoEstadual')?.clearValidators();
      this.formCliente.get('dataCriacao')?.clearValidators();
    } else {
      this.formCliente.get('nome')?.clearValidators();
      this.formCliente.get('rg')?.clearValidators();
      this.formCliente.get('dataNascimento')?.clearValidators();
      this.formCliente.get('cpfCnpj')?.setValidators(Validators.required);
      this.formCliente.get('email')?.setValidators(Validators.required);
      this.formCliente.get('tipoPessoa')?.setValidators(Validators.required);
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
    } else {
      this.formCliente.markAllAsTouched();
    }
  }

  validaCPFCNPJ(control: AbstractControl): {[key: string]: boolean} | null {
    const value = control.value;

    if(!value) {
      return null;
    }

    const valido = '([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})';

    return valido ? null : {cpfCnpjInvalido: true};
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoPessoa} from "../../../models/enum/tipo-pessoa";
import {ClientService} from "../../../services/client.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Cliente} from "../../../models/cliente";

@Component({
  selector: 'app-edita-cliente-modal',
  templateUrl: './edita-cliente-modal.component.html',
  styleUrls: ['./edita-cliente-modal.component.css']
})
export class EditaClienteModalComponent {
  clienteForm: FormGroup;
  tipoPessoa = TipoPessoa;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientService,
    public dialogRef: MatDialogRef<EditaClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
  ) {
    this.clienteForm = this.formBuilder.group({
      tipoPessoa: [data.tipoPessoa],
      cpfCnpj: [data.cpfCnpj, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      nome: [data.nome],
      razaoSocial: [data.razaoSocial],
      rg: [data.rg],
      inscricaoEstadual: [data.inscricaoEstadual],
      dataNascimento: [data.dataNascimento],
      dataCriacao: [data.dataCriacao]
    });

    this.clienteForm.get('tipoPessoa')?.valueChanges.subscribe(value => {
      this.updateFormValidators(value);
    });
  }

  updateFormValidators(tipoPessoa: TipoPessoa): void {
    if(tipoPessoa === TipoPessoa.FISICA) {
      this.clienteForm.get('nome')?.setValidators(Validators.required);
      this.clienteForm.get('rg')?.setValidators(Validators.required);
      this.clienteForm.get('dataNascimento')?.setValidators(Validators.required);
      this.clienteForm.get('razaoSocial')?.clearValidators();
      this.clienteForm.get('inscricaoEstadual')?.clearValidators();
      this.clienteForm.get('dataCriacao')?.clearValidators();
    } else {
      this.clienteForm.get('nome')?.clearValidators();
      this.clienteForm.get('rg')?.clearValidators();
      this.clienteForm.get('dataNascimento')?.clearValidators();
      this.clienteForm.get('razaoSocial')?.setValidators(Validators.required);
      this.clienteForm.get('inscricaoEstadual')?.setValidators(Validators.required);
      this.clienteForm.get('dataCriacao')?.setValidators(Validators.required);
      this.clienteForm.get('email')?.setValidators([Validators.required, Validators.email]);
    }

    this.clienteForm.updateValueAndValidity();
  }

  mudaAtivo(): void {
    this.data.ativo = !this.data.ativo;
  }

  onSubmit(): void {
    if(this.clienteForm.valid) {
      const clienteAtualizado: Cliente = {
        ...this.data,
        ...this.clienteForm.value,
        ativo: this.data.ativo
      };

      this.clienteService.atualizaCliente(clienteAtualizado).subscribe(() => {
        this.dialogRef.close(clienteAtualizado);
      },
        (error) => {
          console.error('Erro ao atualizar cliente: ', error);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

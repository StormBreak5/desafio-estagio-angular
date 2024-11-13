import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Endereco} from "../../../models/endereco";
import {ConsultaCepService} from "../../../services/consulta-cep.service";

@Component({
  selector: 'app-cria-endereco',
  templateUrl: './cria-endereco.component.html',
  styleUrls: ['./cria-endereco.component.css']
})
export class CriaEnderecoComponent {

  formEndereco!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CriaEnderecoComponent>,
    private cepService: ConsultaCepService,
    @Inject(MAT_DIALOG_DATA) public data: {endereco?: Endereco}
  ) {
    this.formEndereco = formBuilder.group({
      logradouro: [data.endereco?.logradouro || '', Validators.required],
      numero: [data.endereco?.numero || '', Validators.required],
      complemento: [data.endereco?.complemento || ''],
      bairro: [data.endereco?.bairro || '', Validators.required],
      cidade: [data.endereco?.cidade || '', Validators.required],
      uf: [data.endereco?.uf || '', Validators.required],
      cep: [data.endereco?.cep || '', Validators.required],
      telefone: [data.endereco?.telefone || '', Validators.required],
      enderecoPrincipal: [data.endereco?.enderecoPrincipal || false]
    });
  }

  consultaCep(ev: any, f: any) {
    const cep = ev.target.value;
    if(cep != '') {
      this.cepService.getConsultaCep(cep).subscribe(result => this.populaEndereco(result, f))
    }
    return
  }

  populaEndereco(dados: any, f: any) {
    f.form.patchValue({
      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    })
  }

  onSubmit(): void {
    if(this.formEndereco.valid) {
      this.dialogRef.close(this.formEndereco.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

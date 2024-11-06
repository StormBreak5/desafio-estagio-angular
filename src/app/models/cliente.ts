import {TipoPessoa} from "./enum/tipo-pessoa";
import {Endereco} from "./endereco";

export interface Cliente {
  id?: number;
  tipoPessoa: TipoPessoa
  cpfCnpj: string;
  email: string;
  ativo: boolean;

  nome?: string;
  rg?: string;
  dataNascimento?: Date;

  razaoSocial?: string;
  inscEstadual?: string;
  dataCriacao?: Date;

  enderecos?: Endereco[];
}

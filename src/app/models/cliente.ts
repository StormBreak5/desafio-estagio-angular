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
  dataNascimento?: Date | null;

  razaoSocial?: string;
  inscricaoEstadual?: string;
  dataCriacao?: Date | null;

  enderecos?: Endereco[];
}

export interface Endereco {
    id?: number;
    logradouro: string;
    numero?: string;
    cep: string;
    bairro: string;
    telefone: string;
    cidade: string;
    uf: string;
    complemento?: string;
    enderecoPrincipal: string;
}

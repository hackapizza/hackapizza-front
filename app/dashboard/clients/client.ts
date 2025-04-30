export interface Client {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    bairro: string;
    rua: string;
    numero: string;
    cidade: string;
    criadoEm?: string;
    atualizadoEm?: string;
}
export type User = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cargo: "gerente" | "atendente" | "cozinheiro";
    deletadoEm: Date | null;
    criadoEm: Date;
    atualizadoEm: Date;
}
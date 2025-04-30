export type Product = {
    id: number;
    nome: string;
    preco: number;
    categoria: "pizza" | "bebida" | "sobremesa" | "outra";
    tamanho: string;
    sabor: string;
    disponivel: boolean;
}
import { Product } from "../products/product";

export type OrderItem = {
    id: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    subtotal: number;
    produto?: Product;
}
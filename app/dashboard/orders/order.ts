import { User } from "../users/user";
import { OrderItem } from "./order-item";

export type Order = {
    id: number;
    clienteId: number;
    usuarioId: number;
    dataPedido: Date;
    status: "recebido" | "preparando" | "entregue" | "cancelado";
    total: number;
    usuario?: User,
    itens?: OrderItem[];
}
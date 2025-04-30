import { Client } from "../clients/client";
import { User } from "../users/user";
import { OrderItem } from "./order-item";

export type Order = {
    id: number;
    clienteId: number;
    usuarioId: number;
    dataPedido: Date;
    status: "recebido" | "preparando" | "entregue" | "cancelado";
    total: number;
    cliente?: Client;
    usuario?: User,
    itens?: OrderItem[];
}
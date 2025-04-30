"use client";

import { LocalDataTimeFormat } from "@/common/local-data-time-format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Order } from "./order";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    async function getOrders() {
        try {
            const response = await api.get("/pedidos");
            const data = response.data;
            setOrders(data);
            toast.success("Pedidos carregados com sucesso!");
        }
        catch (error) {
            toast.error("Erro ao buscar pedidos");
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            <div className="w-full mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Pedidos</h2>
                <div className="flex gap-3">
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">ID do pedido</TableHead>
                            <TableHead>ID do Client</TableHead>
                            <TableHead>ID do Funcionário</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orders.map((order) => (
                                <TableRow key={order.id + order.clienteId}>
                                    <TableCell className="font-medium">
                                        <Link href={`/dashboard/orders/${order.id}`} className="text-blue-500 hover:text-blue-700">
                                            {order.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{order.clienteId}</TableCell>
                                    <TableCell>{order.usuarioId}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>{LocalDataTimeFormat(new Date(order.dataPedido))}</TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </div>
        </>
    );
}
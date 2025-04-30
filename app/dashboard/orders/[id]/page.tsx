"use client";

import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Order } from "../order";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LocalDataTimeFormat } from "@/common/local-data-time-format";


export default function OrderPage() {
    const [order, setOrder] = useState<Order | null>(null);
    const params = useParams();
    const id = params?.id as string;

    async function getOrder(id: string) {
        try {
            const response = await api.get("/pedidos/" + id);
            const data = response.data;
            setOrder(data);
            toast.success("Pedido carregado com sucesso!");
        }
        catch (error) {
            console.log(error)
            toast.error("Erro ao buscar pedido");
        }
    }
    
    useEffect(() => {
        getOrder(id);
    }, [])

    return (
        <>
            <div className="w-full mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Pedido {order?.id}</h2>
                <div className="flex gap-3">
                </div>
            </div>

            <div>
                <div className="rounded-md border">
                    <div className="p-4">
                        <h3 className="text-lg font-medium">Detalhes do Pedido</h3>
                        <p>ID do Cliente: {order?.cliente?.nome}</p>
                        <p>ID do Funcionário: {order?.usuario?.nome}</p>
                        <p>Status: {order?.status}</p>
                        <p>Data do Pedido: {LocalDataTimeFormat(order?.dataPedido!)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
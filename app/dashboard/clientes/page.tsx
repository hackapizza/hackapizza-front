"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateClienteForm } from "./components/create-cliente-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/axios";

interface Cliente {
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

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    async function getClientes() {
        try {
            const response = await api.get("/clientes");
            setClientes(response.data);
            toast.success("Clientes carregados com sucesso!");
        } catch (error) {
            toast.error("Erro ao buscar clientes, tente novamente mais tarde.");
        }
    }

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <>
            <div className="w-full mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Clientes</h2>
                <div className="flex gap-3">
                    <CreateClienteForm setClientes={setClientes} />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Endereço</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Criado em</TableHead>
                            <TableHead>Atualizado em</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clientes.map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableCell className="font-medium">{cliente.nome}</TableCell>
                                <TableCell>{cliente.cpf}</TableCell>
                                <TableCell>{cliente.telefone}</TableCell>
                                <TableCell>{`${cliente.rua}, ${cliente.numero} - ${cliente.bairro}`}</TableCell>
                                <TableCell>{cliente.cidade}</TableCell>
                                <TableCell>{cliente.criadoEm ? new Date(cliente.criadoEm).toLocaleDateString() : "-"}</TableCell>
                                <TableCell>{cliente.atualizadoEm ? new Date(cliente.atualizadoEm).toLocaleDateString() : "-"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

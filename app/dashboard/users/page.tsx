"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateUserForm } from "./components/create-user-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { LocalDataFormat } from "@/common/local-data-format";
import { stringCapitalize } from "@/common/string-capitalize";
import { User } from "./user";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    async function getUsers() {
        try {
            const response = await api.get("/usuario");
            setUsers(response.data);
            toast.success("Usuários carregados com sucesso!");
        }
        catch (error) {
            toast.error("Erro ao buscar usuários, tente novamente mais tarde.");
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className="w-full mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Usuários</h2>
                <div className="flex gap-3">
                    <CreateUserForm setUsers={setUsers}/>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Criado em</TableHead>
                            <TableHead>Atualizado em</TableHead>
                            <TableHead>Ativo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.email + user.id}>
                                <TableCell className="font-medium">{user.nome}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{stringCapitalize(user.cargo)}</TableCell>
                                <TableCell>{LocalDataFormat(user.criadoEm)}</TableCell>
                                <TableCell>{LocalDataFormat(user.atualizadoEm)}</TableCell>
                                <TableCell>{user.deletadoEm ? "Não" : "Sim"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
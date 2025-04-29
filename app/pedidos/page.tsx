import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Pedido {
    id: number;
    status: string;
    total: number;
    criadoEm: string;
    atualizadoEm: string;
}

const pedidosPlaceholder: Pedido[] = [
    {
        id: 1234,
        status: "Recebido",
        total: 64.99,
        criadoEm: "15/04/2021 19:42",
        atualizadoEm: "15/04/2021 18:23"
    },
];

export default function PedidosPage() {
    return (
        <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
            <div className="w-full">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Pedidos</h1>
                        <Button>
                            + Adicionar
                        </Button>
                    </div>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Criado em</TableHead>
                                    <TableHead>Atualizado em</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pedidosPlaceholder.map((pedido) => (
                                    <TableRow key={pedido.id}>
                                        <TableCell>{pedido.id}</TableCell>
                                        <TableCell>{pedido.status}</TableCell>
                                        <TableCell>{pedido.total}</TableCell>
                                        <TableCell>{pedido.criadoEm}</TableCell>
                                        <TableCell>{pedido.atualizadoEm}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

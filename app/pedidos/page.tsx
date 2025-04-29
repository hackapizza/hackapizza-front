import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
                                <TableRow>
                                    <TableCell>1234</TableCell>
                                    <TableCell>Recebido</TableCell>
                                    <TableCell>64,99</TableCell>
                                    <TableCell>15/04/2021 19:42</TableCell>
                                    <TableCell>15/04/2021 18:23</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

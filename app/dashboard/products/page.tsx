"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateProductForm } from "./components/create-product-form";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Product } from "./product";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    async function getProducts() {
        try {
            const response = await api.get("/produtos");
            const data = response.data;
            setProducts(data);
            toast.success("Produtos carregados com sucesso!");
        }
        catch (error) {
            toast.error("Erro ao buscar produtos");
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="w-full mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Produtos</h2>
                <div className="flex gap-3">
                    <CreateProductForm setProducts={setProducts}/>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">Nome</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Tamanho</TableHead>
                            <TableHead>Sabor</TableHead>
                            <TableHead>Disponível</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id + product.nome}>
                                <TableCell className="font-medium">{product.nome}</TableCell>
                                <TableCell>R$ {product.preco}</TableCell>
                                <TableCell>{product.categoria}</TableCell>
                                <TableCell>{product.tamanho}</TableCell>
                                <TableCell>{product.sabor ?? "Padrão"}</TableCell>
                                <TableCell>{product.disponivel ? "Sim" : "Não"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
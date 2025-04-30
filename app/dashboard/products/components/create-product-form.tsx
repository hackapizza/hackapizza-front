"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, PlusIcon, SaveIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../users/user";
import { Product } from "../product";
import { api } from "@/lib/axios";
import { toast } from "sonner";


interface CreateProductFormData {
    nome: string;
    preco: number;
    categoria: "pizza" | "bebida" | "sobremesa" | "outra";
    tamanho: string;
    sabores: string;
}

interface CreateUserFormProps {
    setProducts: Dispatch<SetStateAction<Product[]>>;
}

export function CreateProductForm(props: CreateUserFormProps) {
    const form = useForm<CreateProductFormData>({ mode: "onBlur" })

    async function onSubmit(data: CreateProductFormData) {
        try {
            const response = await api.post("/produtos", {...data, preco: Number(data.preco)});
            toast.success("Produto cadastrado com sucesso!");
            props.setProducts((prev) => [...prev, response.data]);
            form.reset();
        }
        catch (error) {
            console.log(error);
            toast.error("Erro ao cadastrar produto, tente novamente mais tarde.");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><PlusIcon /> Adicionar</Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-md mx-auto p-6 rounded-lg bg-background">
                <DialogHeader>
                    <DialogTitle>Cadastro de produtos</DialogTitle>
                    <DialogDescription>Preecha o formulário abaixo para cadastro de um novo produto</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="my-4 flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="José dos Santos" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="preco"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="34,49" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            rules={{
                                required: "Campo obrigatório",
                                min: {
                                    value: 0,
                                    message: "O preço não pode ser negativo",
                                }
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="categoria"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione um categoria de produto" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="pizza">Pizza</SelectItem>
                                                <SelectItem value="bebida">Bebida</SelectItem>
                                                <SelectItem value="sobremsa">Sobremesa</SelectItem>
                                                <SelectItem value="outra">Outra</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tamanho"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tamanho</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Grande" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sabores"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sabor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Carne de sol" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost" disabled={form.formState.isSubmitting}>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> :<SaveIcon />}
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
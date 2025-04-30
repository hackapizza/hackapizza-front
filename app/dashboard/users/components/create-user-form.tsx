"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { api } from "@/lib/axios";
import { Loader2, PlusIcon, SaveIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User } from "../user";


interface CreateUserFormData {
    nome: string;
    email: string;
    senha: string;
    cargo: "gerente" | "atendente" | "cozinheiro";
}

interface CreateUserFormProps {
    setUsers: Dispatch<SetStateAction<User[]>>;
}

export function CreateUserForm(props: CreateUserFormProps) {
    const form = useForm<CreateUserFormData>({ mode: "onBlur" });

    async function onSubmit(data: CreateUserFormData) {
        try {
            const response = await api.post("/usuario", data);
            toast.success("Usuário cadastrado com sucesso!");
            props.setUsers((prev) => [...prev, response.data]);
            form.reset();
        }
        catch(error) {
            console.log(error);
            toast.error("Erro ao cadastrar usuário, tente novamente mais tarde.");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><PlusIcon /> Adicionar</Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-md mx-auto p-6 rounded-lg bg-background">
                <DialogHeader>
                    <DialogTitle>Cadastro de usuário</DialogTitle>
                    <DialogDescription>Preecha o formulário abaixo para cadastro de um novo usuário</DialogDescription>
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="joseds@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cargo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cargo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione um cargo para o usuário" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="gerente">Gerente</SelectItem>
                                            <SelectItem value="atendente">Atendente</SelectItem>
                                            <SelectItem value="cozinheiro">Cozinheiro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost" disabled={form.formState.isSubmitting}>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? <Loader2 className="animate-spinmr-2 h-4 w-4 animate-spin"/>: <SaveIcon />} 
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>

                </Form>

            </DialogContent>
        </Dialog>
    );
}
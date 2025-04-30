"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { Loader2, PlusIcon, SaveIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  bairro: string;
  rua: string;
  numero: string;
  cidade: string;
}

interface CreateClienteFormData {
  nome: string;
  cpf: string;
  telefone: string;
  bairro: string;
  rua: string;
  numero: string;
  cidade: string;
}

interface CreateClienteFormProps {
  setClientes: Dispatch<SetStateAction<Cliente[]>>;
}

export function CreateClienteForm({ setClientes }: CreateClienteFormProps) {
  const form = useForm<CreateClienteFormData>({ mode: "onBlur" });

  async function onSubmit(data: CreateClienteFormData) {
    try {
      const response = await api.post("/clientes", data);
      toast.success("Cliente cadastrado com sucesso!");
      setClientes(prev => [...prev, response.data]);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar cliente. Tente novamente.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><PlusIcon /> Adicionar Cliente</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md mx-auto p-6 rounded-lg bg-background">
        <DialogHeader>
          <DialogTitle>Cadastro de Cliente</DialogTitle>
          <DialogDescription>Preencha os dados abaixo para cadastrar um novo cliente.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 flex flex-col gap-3">
            {[
              { name: "nome", label: "Nome", placeholder: "Maria Oliveira" },
              { name: "cpf", label: "CPF", placeholder: "12345678900" },
              { name: "telefone", label: "Telefone", placeholder: "(11) 99999-9999" },
              { name: "bairro", label: "Bairro", placeholder: "Centro" },
              { name: "rua", label: "Rua", placeholder: "Rua das Flores" },
              { name: "numero", label: "Número", placeholder: "123" },
              { name: "cidade", label: "Cidade", placeholder: "São Paulo" },
            ].map(({ name, label, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof CreateClienteFormData}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost" disabled={form.formState.isSubmitting}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SaveIcon className="mr-2 h-4 w-4" />
                )}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

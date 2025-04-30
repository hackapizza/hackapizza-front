"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Loader2, PlusIcon, SaveIcon, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Client } from "../../clients/client";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "../../products/product";
import { Input } from "@/components/ui/input";
import { toLocalCurrency } from "@/common/to-local-currency";
import { Order } from "../order";

interface CreateOrderFormData {
  clienteId: number;
  formaPagamento: "dinheiro" | "cartao" | "pix";
  itens: {
    produtoId: number;
    quantidade: number;
    subtotal: number;
  }[];
}

interface CreateOrderFormProps {
    setOrders: Dispatch<SetStateAction<Order[]>>;
}



export function CreatePedidoForm(props: CreateOrderFormProps) {
  const form = useForm<CreateOrderFormData>({ mode: "onBlur" })
  const { fields, append } = useFieldArray({ control: form.control, name: "itens" });
  const watchedItems = useWatch({ control: form.control, name: "itens" });

  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function getClients() {
    try {
      const response = await api.get("/clientes");
      setClients(response.data);
    } catch (error) {
      toast.error("Erro ao buscar clientes, tente novamente mais tarde.");
    }
  }

  async function getProducts() {
    try {
      const response = await api.get("/produtos");
      const data = response.data;
      setProducts(data);
    }
    catch (error) {
      toast.error("Erro ao buscar produtos");
    }
  }

  async function onSubmit(data: CreateOrderFormData) {
    const newData = {
      ...data,
      clienteId: Number(data.clienteId),
      usuarioId: 1,
      status: "recebido",
      total: data.itens.reduce((acc, item) => acc + item.subtotal, 0),
    }

    try {
      const response = await api.post("/pedidos", newData);
      if (response.status === 201) {
        toast.success("Pedido cadastrado com sucesso!");
        props.setOrders((prev) => [...prev, response.data]);
        form.reset();
      }
    }
    catch(error) {
      console.log(error);
      toast.error("Erro ao cadastrar pedido, tente novamente mais tarde.");
    }
  }

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><PlusIcon /> Adicionar</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-lg mx-auto p-6 rounded-lg bg-background">
        <DialogHeader>
          <DialogTitle>Cadastro de produtos</DialogTitle>
          <DialogDescription>Preecha o formulário abaixo para cadastro de um novo produto</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="my-4 flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="clienteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem
                            key={client.id}
                            value={client.id.toString()}>{`${client.id} - ${client.nome} - Tel: ${client.telefone}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formaPagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de pagamento</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma forma de pagamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="cartao">Cartão</SelectItem>
                        <SelectItem value="pix">Pix</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>


              )}
            />

            <p className="mt-3">
              Total: {toLocalCurrency(watchedItems?.reduce((acc, item) => acc + (item.subtotal || 0), 0) || 0)} 
            </p>

            <Button
              type="button"
              onClick={() => append({ produtoId: 0, quantidade: 1, subtotal: 0 })}
            >
              Adicionar produto
            </Button>

            <div className="my-3 space-y-4 overflow-y-auto max-h-[250px]">
              {
                fields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`itens.${index}`}
                    render={({ field }) => (
                      <div className="flex gap-3 items-end">
                        <FormItem className="w-full">
                          <FormLabel>Produto</FormLabel>
                          <FormControl>
                            <Select onValueChange={(value) => {
                              field.onChange({ ...field.value, produtoId: Number(value), subtotal: field.value.quantidade * (products.find(product => product.id === Number(value))?.preco ?? 0) });
                            }} defaultValue={field.value.produtoId?.toString()}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecione um produto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id.toString()}>{`${product.nome} - R$ ${product.preco}`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormLabel>Quantidade</FormLabel>
                          <FormControl>
                            <Input className="max-w-[150px]" type="number" min={1} defaultValue={1} onChange={(e) => {
                              const quantity = Number(e.target.value);
                              field.onChange({ ...field.value, quantidade: quantity, subtotal: quantity * (products.find(product => product.id === field.value.produtoId)?.preco ?? 0) });
                            }} />
                          </FormControl>
                        </FormItem>

                        <Button type="button" variant="destructive" size="icon" onClick={() => form.setValue("itens", form.getValues("itens").filter((_, i) => i !== index))}><TrashIcon /></Button>
                      </div>
                    )}
                  ></FormField>
                ))
              }
            </div>


            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost" disabled={form.formState.isSubmitting}>Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <SaveIcon />}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
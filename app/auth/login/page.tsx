"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, ToastContainer } from "react-toastify"; // Importando o toast e o ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importando o CSS do react-toastify

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        senha,
      });
      
      localStorage.setItem("token", response.data.token);

      
      toast.success("Login bem-sucedido!", {autoClose: 1500, onClose: ()=>router.push("/")});             
    } catch (err) {
      console.error(err);      
      toast.error("Email ou senha inválidos!");
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Digite seu e-mail abaixo para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Não possui conta?{" "}
                  <a href="/auth/register" className="underline underline-offset-4">
                    Registre-se aqui
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>      
      <ToastContainer />
    </div>
  );
}

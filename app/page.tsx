import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-cente w-screen h-screen">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-2">

        <h2 className="w-full mb-6 text-zinc-700 text-3xl font-bold">Bem-vindo ao <br/><span className="text-sky-600 text-6xl">Hacka Pizza</span></h2>

        <Button asChild size="lg" className="w-full">
          <a href="auth/login">Login</a>
        </Button>

        <Button asChild variant="ghost" size="lg" className="w-full">
          <a href="auth/register">Registre-se</a>
        </Button>
      </div>
    </div>
  );
}

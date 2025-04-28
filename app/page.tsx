import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-1 w-screen h-screen">
      <div className="w-fit max-w-md mx-auto flex flex-col justify-center items-center gap-4 ">

        <h2 className="mb-6 text-foreground text-3xl font-bold">Bem-vindo ao Hacka Pizza</h2>

        <Button asChild size="lg" className="w-full">
          <a href="auth/login">
            Ir para login
          </a>
        </Button>

        <Button variant="ghost" asChild size="lg" className="w-full">
          <a href="auth/register">
            Ir para registro
          </a>
        </Button>
      </div>
    </div>
  );
}

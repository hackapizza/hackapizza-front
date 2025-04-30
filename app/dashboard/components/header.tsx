"use client"

import { useAuth } from "@/app/auth/use-auth";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { LogOutIcon } from "lucide-react";


const dashboardHeaderLinks = [
    {
        label: "Produtos",
        link: "/dashboard/products"
    },
    {
        label: "Pedidos",
        link: "/dashboard/orders",
    },
    {
        label: "Clientes",
        link: "/dashboard/clientes"
    },
    {
        label: "Usuários",
        link: "/dashboard/users"
    },
];


export function DashboardHeader() {
    const { logout } = useAuth();

    const links = dashboardHeaderLinks.map(({ label, link }) => {
        return (
            <NavigationMenuItem key={label + link}>
                <NavigationMenuLink href={link}>
                    {label}
                </NavigationMenuLink>
            </NavigationMenuItem>

        );
    });

    return (
        <div className="w-full border-b border-border">
            <header className="w-full max-w-7xl mx-auto py-3 px-6 flex items-center justify-end">
                <NavigationMenu>
                    <NavigationMenuList>
                        {links}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="border-l border-border">
                    <Button variant="secondary" className="ml-4" onClick={logout}>
                        <LogOutIcon />
                        Sair
                    </Button>
                </div>
            </header>
        </div>
    );
}
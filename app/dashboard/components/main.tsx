import { ReactNode } from "react";

interface DashboardMainProps {
    children: ReactNode;
}

export function DashboardMain(props: DashboardMainProps) {
    return (
        <main className="w-full max-w-7xl mx-auto p-6">
            {props.children}
        </main>
    );
}
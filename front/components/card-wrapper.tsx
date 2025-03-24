'use client';

import { Card, CardContent, CardHeader } from "./ui/card";
import { Header } from "./auth/header";


interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md bg-gray-50">
            <CardHeader>
                <Header label = {headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

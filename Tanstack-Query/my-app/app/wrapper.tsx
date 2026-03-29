"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Wrapper({ children }: { children: React.ReactNode }) {

    const [client] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={client}>
            {children}
            <Toaster />
        </QueryClientProvider>
    )
};
"use client";

import { useState } from "react";

const page = () => {
    const [userData] = useState(() => {
        const data = localStorage.getItem("info");
        return data ? JSON.parse(data) : null
    })

    return (
        <div className="min-h-screen bg-neutral-700 text-gray-400">
            {JSON.stringify(userData)}
        </div>
    )
}

export default page
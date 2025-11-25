import { createContext, useState } from "react";

export let Store = createContext();

export const Context = ({ children }) => {
    const [allTask, setAllTask] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || []
    });

    return (
        <Store.Provider value={{ allTask, setAllTask }}>
            {children}
        </Store.Provider>
    )
}
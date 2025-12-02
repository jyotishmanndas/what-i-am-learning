import { useEffect, useState } from "react"
import axios from "axios"


export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get("https://fakestoreapi.com/users")
            .then((res) => {
                setTodos(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        todos,
        loading
    }
}
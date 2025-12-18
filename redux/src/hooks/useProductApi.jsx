import { useQuery } from "@tanstack/react-query"
import { fetchedProducts } from "../apis/productApis"

export const useProductApi = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchedProducts,
        staleTime: Infinity
    })
}
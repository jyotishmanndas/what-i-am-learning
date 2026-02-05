import { fetchedProducts } from "@/apis/ProductApi";
import { useQuery } from "@tanstack/react-query";

export const useProductApi = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchedProducts,
        staleTime: 5 * 60 * 1000
    })
}
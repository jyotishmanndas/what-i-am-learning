import { CartApi } from "@/apis/CartApi";
import { useQuery } from "@tanstack/react-query";

export const useCartApi = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: CartApi,
    })
}
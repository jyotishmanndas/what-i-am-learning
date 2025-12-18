import { useQuery } from "@tanstack/react-query"
import { fetchedUser } from "../apis/userApis"

export const useUserApi = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchedUser,
        staleTime: Infinity
    })
}
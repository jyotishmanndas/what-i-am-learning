import { fetchedPosts } from "@/apis/fetchedPosts"
import { useQuery } from "@tanstack/react-query"

export const useFetchedData = (loadData: boolean) => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchedPosts,
        enabled: loadData,
    })
};
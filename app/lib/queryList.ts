import { useQuery } from "@tanstack/react-query";

type ListItem = {
    id: string,
    title: string,
    creator: string,
    createdAt: string
}

export function QueryList ({ initData, userId } : { initData: ListItem[]; userId: string } ){
    const {data, isLoading, isPending, error} = useQuery<ListItem[]>({
        queryKey: ["list", userId],
        queryFn: async () => {
            const data = await fetch(`api/list/${userId}`).then(res => res.json());
            const {lists} = data;
            return Array.isArray(lists) ? lists : [];
        },
        initialData: initData,
        refetchOnMount: false,
        staleTime: 0,

    }) 

    return {data, isLoading, isPending, error};
}


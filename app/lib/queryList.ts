import { useQuery } from "@tanstack/react-query";

import { ListItemType } from "./types";

export function QueryList ({ initData, userId } : { initData: ListItemType[]; userId: string } ){
    const {data, isLoading, isPending, error} = useQuery<ListItemType[]>({
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


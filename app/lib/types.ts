export type ListItemType = {
    id: string,
    title: string,
    creator: string,
    createdAt: string,
    slug: string
}

export interface TodoState {
    id      :string,   
    title   :string,
    creator :string,
    listId  :string,
    createdAt   : Date, 
    lastUpdated : Date, 
    completed: boolean,
    due: string,
    important: boolean
}
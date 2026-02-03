export default async function ListPage({params}: {params: Promise<{ listId: string }>}){
    const {listId} = await params;
    console.log(listId);
    return(
        <>
            <h1>ListPage</h1>
        </>
    )
}
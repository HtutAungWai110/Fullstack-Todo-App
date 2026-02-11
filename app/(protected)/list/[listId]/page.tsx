import Todos from "@/app/client/todos";

export default async function ListPage({params}: {params: Promise<{ listId: string }>}){
    const {listId} = await params;
    console.log(listId);

    const todos = await fetch(`${process.env.HOST_URL}/api/todo/${listId}`).then(res => res.json());
    return(
        <main>
            <section className="mt-5">
            <Todos initialState={todos.data} listId={listId}/>
            </section>
        </main>
    )
}
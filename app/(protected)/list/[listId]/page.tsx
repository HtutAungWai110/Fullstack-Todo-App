import Todos from "@/app/client/todos";
import getUser from "@/app/lib/getUserInfo";
import { notFound } from "next/navigation";

export default async function ListPage({params}: {params: Promise<{ listId: string }>}){
    const {listId} = await params;
    const {id: userId} = await getUser() as {id: string};

    const res = await fetch(`${process.env.HOST_URL}/api/todo/${listId}/${userId}`, { cache: "no-store", next: {revalidate: 10} });
    if(!res.ok){
        notFound();
    }
    const todos = await res.json();
    
    console.log(todos);
    return(
        <main>
            <section className="mt-5">
            <Todos initialState={todos.data} listId={listId}/>
            </section>
        </main>
    )
}
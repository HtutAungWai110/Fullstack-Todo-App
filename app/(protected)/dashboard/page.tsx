
import getUser from "@/app/lib/getUserInfo";
import Todos from "@/app/client/todos"



export default async function Dashboard () {
    const user = await getUser();
    if (!user || typeof user === "string") {
        return (
            <main>
                <p>Dashboard</p>
                <p>Not signed in</p>
            </main>
        );
    }
    const { id } = user as { id: string };
    const url = `${process.env.HOST_URL}/api/list/${id}`
    const data = await fetch(url).then(res => res.json());
    const {lists} = data;
    console.log(data);
    return(
        <main>
            <section>
                <Todos initData={lists} userId={id}/>
            </section>
        

        </main>
    )
}
// import getUser from "@/app/lib/getUserInfo";
// import { getTodos as getTodosFromController } from "@/app/controllers/todoController";

// export default async function getTodos() {
//     const user = await getUser();
    
//     if (!user || typeof user === "string") {
//         return { todos: [], status: 401, message: "Unauthorized" };
//     }

//     const { id } = user;

//     try {
//         const { todos } = await getTodosFromController(id);
//         return { todos, status: 200 };
//     } catch (e) {
//         return { 
//             todos: [], 
//             status: 400, 
//             message: (e as Error).message 
//         };
//     }
// }
import { TodoState } from "../lib/types";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo } from "@/app/state/todoSlice";
import { useMutation } from "@tanstack/react-query";

export default function TodoCard({todo, listId} : {todo: TodoState, listId: string}){
    const dispatch = useDispatch();
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/todo/${listId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: todo.id})  
            })
            const data = await res.json();
            console.log(data)
            return data.data;
        },
        onSuccess: (data) => {
            dispatch(deleteTodo(data.id));
        }
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    }

    return (
        <div className="border p-4 rounded-4xl shadow-md md:m-5 m-2 flex items-center justify-between">
            <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
            <div className="flex items-center gap-2">
                <p className="text-gray-600">Due: {new Date(todo.due).toLocaleString()}</p>
                <button>{todo.important ? <FaStar/> : <FaRegStar/>}</button>
                <button onClick={handleDelete} className="text-red-500 active:scale-3d"><FaTrash/></button>
            </div>
        </div>
    )
}
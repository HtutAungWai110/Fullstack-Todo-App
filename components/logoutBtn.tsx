'use client'
import { useRouter } from "next/navigation";


export default function LogoutBtn(){
    const router = useRouter();
    const logout = async () => {
        await fetch("api/logout", {method: "POST"});
        router.push('/login');
    }

    return (
        <button className="mr-1" onClick={logout}>Logout</button>
    )

}
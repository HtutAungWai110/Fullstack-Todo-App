import { FaLaptopCode } from "react-icons/fa"
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import getUser from "@/app/lib/getUserInfo"

export const Navbar = async () => {
    const user = await getUser();
    const username = typeof user === 'object' && user !== null && 'username' in user ? user.username : '';
    console.log(username)
    return (
        <nav className="p-5 flex justify-between border-b-gray-400 rounded-2xl shadow-md">
            <h2>Todo App</h2>
            <ul className="flex gap-1">
                <Link href={'/dashboard'}>
                    <li className="nav-items">
                        <FaLaptopCode/>Dashboard
                    </li>
                </Link>

                <Link href={"/profile"}>
                    <li className="nav-items">
                        {username}<FaUser className=" opacity-50 border w-[25px] h-[25px] p-[3px] rounded-2xl ml-[5px]"/>
                    </li>
                </Link>
                
                
            </ul>
        </nav>
    )
}
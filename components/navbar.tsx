import { FaLaptopCode } from "react-icons/fa"
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import getUser from "@/app/lib/getUserInfo"
import LogoutBtn from "./logoutBtn";
import { FaDoorOpen } from "react-icons/fa6";

export const Navbar = async () => {
    const user = await getUser();
    const username = typeof user === 'object' && user !== null && 'username' in user ? user.username : '';
    console.log(username)
    return (
        <nav className="p-5 flex justify-between border-b-gray-400 rounded-2xl shadow-md">
            <h2>Todo App</h2>
            <ul className="flex gap-1">
                
                <li className="nav-items">
                    <span className="mr-1 ">Welcome</span>{username}<FaUser className=" opacity-50 border w-[25px] h-[25px] p-[3px] rounded-2xl ml-[5px]"/>
                </li>
                <Link href={'/dashboard'}>
                    <li className="nav-items">
                        <FaLaptopCode/>Dashboard
                    </li>
                </Link>
                <li className="nav-items">
                    <LogoutBtn/>
                    <FaDoorOpen/>
                </li>
                
            </ul>
        </nav>
    )
}
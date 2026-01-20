'use client';
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { DotCircleWithLabelDemo } from "./dotcircleLoader";
import { useRouter } from "next/navigation";

type Inputs = {
    email: string
    password: string;
}

export default function LoginForm(){

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [isHidden, setHidden] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setError(null);
            setIsLoading(true);
            const res = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })

            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            const user = await res.json();
            router.push('/dashboard');
        } catch (e) {
            if(!navigator.onLine){
                throw new Error("No internet connection");
            }
            setError((e as Error).message);
        } finally {
            setIsLoading(false);
        }
        
    }
    return (
        <>

        {isLoading && 
                    <div className="fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-green-600 border border-gray-200 p-[50px] rounded-2xl z-50">
                    <DotCircleWithLabelDemo label="Loading..."/>
                    </div>
        }

        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center gap-[10px] w-full m-[10px_0px]">
            <input type="email" placeholder="Email" className="w-[90%] border-b-[10px]" {...register("email", {
                required: "Email is required",
            })} />
            <div className="w-[90%] h-[15px]">
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="w-full flex justify-center relative">
                <input type={isHidden ? "password" : "text"} placeholder="Password" className="w-[90%] border-b-[10px]" {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"

                    },
                    pattern: {
                    value: /(?=.*\d)/,
                    message: "Password must contain at least one number",
                    },
                })} />
                <button type="button" onClick={() => setHidden(prev => !prev)} className="absolute top-2 right-10">{isHidden ? "show" : "hide"}</button>
            </div>

            <div className="w-[90%] h-[15px]">
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div>
                {error && <span className="text-red-500">{error}</span>}
            </div>
            
            <button type="submit" className="green-gradient w-[90%] rounded-2xl p-[10px] text-white">Login</button>
            <span>Or</span> 
                <fieldset className="text-center w-[90%]">
                    <legend>
                        <Link className="text-gray-500" href={"/signup"}>Signup here</Link>
                    </legend>
                    
                </fieldset>
            
        </form>
        </>
    )
}
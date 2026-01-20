'use client';
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import ErrorMessage from "./errorMessage";
import SuccessfulMsg from "./successfulMessage";
import { useRouter } from "next/navigation";

import { DotCircleWithLabelDemo } from "./dotcircleLoader";

type Inputs = {
    username: string
    email: string
    password: string;
    confirmPassword: string
}

export default function SignupForm(){

    const {register, handleSubmit, formState: {errors}, getValues} = useForm<Inputs>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isHidden, setHidden] = useState<boolean>(true);
    const [isHiddenConfirm, setHiddenConfirm] = useState<boolean>(true);

    const router = useRouter();


    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setError(null)
        }, 3000)
        
        return () => clearTimeout(timeOutId);
    }, [error])

    

    


    const onSubmit: SubmitHandler<Inputs> = async(data) => {

        try {
            setError(null);
            setIsLoading(true);
            const res = await fetch('api/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            if (!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }
            const user = await res.json();
            setSuccess("Signup successful! Redirecting to login...");
            
            setTimeout(() => {
                router.push('/login');
            }, 3000);
            console.log(user);
        
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
            <DotCircleWithLabelDemo label={"Signing up..."}/>
            </div>
        }

        {success && 
            <SuccessfulMsg message={success}/>
        }
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center gap-[10px] w-full m-[10px_0px]">

            <input type="text" placeholder="Username" className="w-[90%] border-b-[10px]" {...register("username", {
                required: "Username is required",
                minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters" 
                }
            })} />
            <div className="w-[90%] h-[15px]">
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </div>
            <input type="username" placeholder="Email" className="w-[90%] border-b-[10px]" {...register("email", {
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
            <div className="w-full flex justify-center relative">
                <input type={isHiddenConfirm ? "password" : "text"} placeholder="Confirm password" className="w-[90%] border-b-[10px]" {...register("confirmPassword", {
                required: "Confrim password",
                validate: value => value === getValues('password') || "Passwords don't match"
                })} />
                <button type="button" onClick={() => setHiddenConfirm(prev => !prev)} className="absolute top-2 right-10">{isHiddenConfirm ? "show" : "hide"}</button>
            </div>
            

            <div className="w-[90%] h-[15px]">
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
            <div className="w-full h-[30px]">
                {error && <span className="text-red-500">{error}</span>}
            </div>
            <button type="submit" disabled={success ? true : false} className="green-gradient w-[90%] rounded-2xl p-[10px] text-white">Signup</button>
            <span>Or</span> 
            <fieldset className="text-center w-[90%]">
                <legend>
                    <Link className="text-gray-500" href={"/login"}>Login here</Link>
                </legend>
                
            </fieldset>
            
        </form>
        </>
    )
}
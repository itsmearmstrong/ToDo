'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authContext'

const BACKEND_URL = "https://todo-private-0dfm.onrender.com"; // Adjust this to your backend URL


const Login = () => {

    const {setIsAuthenticated} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handlseSignup = async () => {

        try {

            const body = {
                email,
                password
            }

            const response = await fetch(`${BACKEND_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })

            const data = await response.json();

            localStorage.setItem("auth", data.token )
            setIsAuthenticated(true);
            router.push('/dashboard');

            console.log("Login successful", data);

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="relative sm:max-w-xs sm:mx-auto">
            <div className="min-h-auto px-8 py-3 text-left bg-white dark:bg-gray-900/30 rounded-xl shadow-lg"
            >
                <div className="flex flex-col justify-center items-center h-full select-none">
                    <div className="flex flex-col items-center justify-center gap-2 mb-5">
                        <p className="text-[16px] mt-3 font-semibold dark:text-white"> Login </p>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold text-xs text-gray-400">Email:</label>
                        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold text-xs text-gray-400">Password</label>
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"/>
                </div>
                <div>
                    <button type="button" onClick={handlseSignup} className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center 
                    text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"> Login
                    </button> 
                    <p className="flex justify-center p-6">
                        <span className="text-slate-700"> Have an account? </span>
                        <a className="text-blue-500 hover:underline px-2" href="/login"> Sign Up</a>
                    </p>
                </div>
            </div>
        </div>

    )
    
    
    /*return (
        <div classNameName=" bg-white/20 shadow-xl ring-2 ring-black/5 flex items-center h-auto justify-center w-auto px-px py-10 mx-auto md:px-1 lg:px-20 max-w-min rounded-3xl">
            <div classNameName="w-full h-max max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                <div classNameName="flex flex-col">
                    <div>
                        <h2 classNameName="text-4xl text-center text-black">Login</h2>
                    </div>
                </div>
                <form>
                        <div classNameName="mt-4 space-y-6">
                            <div classNameName="col-span-full">
                                <label htmlFor="email" classNameName="block mb-3 text-sm font-medium text-gray-600">Email:</label>
                                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} classNameName="block w-full px-6 py-3 text-black bg-white border
                                 border-gray-200 rounded-full appearance-none focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                            </div>
                            <div classNameName="col-span-full">
                                <label htmlFor="password" classNameName="block mb-3 text-sm font-medium text-gray-600">Password:</label>
                                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} classNameName="block w-full px-6 py-3 text-black
                                 bg-white border border-gray-200 rounded-full appearance-none focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"/>
                            </div>

                            <div classNameName="col-span-full">
                                <button type="button" onClick={handlseSignup} classNameName="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200
                                 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm
                                 focus-visible:ring-black"> Login   </button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    )*/
}

export default Login

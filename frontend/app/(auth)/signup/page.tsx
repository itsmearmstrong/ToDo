'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

const Signup = () => {

    const {setIsAuthenticated } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); 

    const handlseSignup = async () => {

        try {

            const body = {
                name,
                email,
                password
            }

            const response = await fetch(`${BACKEND_URL}/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })

            const data = await response.json();

            localStorage.setItem("auth", data.token)
            setIsAuthenticated(true);
            router.push('/dashboard');

        } catch (error) {
            console.log(error)
        }

    }

    return (
        // <div className='w-full h-screen flex items-center justify-center'>
        //     <form className='flex flex-col items-start justify-center gap-4 max-w-lg w-full '>
        //         <label htmlFor="name">Name:</label>
        //         <input id="name" type="text" onChange={(e) => setName(e.target.value)} className='p-3 rounded-lg focus:outline-none w-full text-black' />


        //         <label htmlFor="email">Email:</label>
        //         <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className='p-3 rounded-lg focus:outline-none w-full text-black' />


        //         <label htmlFor="password">Password:</label>
        //         <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className='p-3 rounded-lg focus:outline-none w-full text-black' />


        //         <button type='button' onClick={handlseSignup} className='bg-blue-400 text-black rounded-lg p-3 mx-auto'>Signup</button>

        //     </form>

        // </div>

        <div className=" bg-white/20 shadow-xl ring-2 ring-black/5 flex items-center h-3/4 justify-center py-px mx-auto md:px-1 lg:px-20 rounded-3xl">
            <div className="max-w-md mx-auto md:max-w-max md:px-0 md:w-fit sm:px-6">
                <div className="flex flex-col">
                    <div>
                        <h2 className="text-4xl p-5 text-center text-black">Sign Up</h2>
                    </div>
                </div>
                <form>
                        <div className="space-y-6">
                            <div className="col-span-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name:</label>
                                <input id="name" type="text" onChange={(e) => setName(e.target.value)} className="block w-full px-6 py-2.5 text-black bg-white/40 border
                                 border-gray-200 rounded-full appearance-none focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                            </div>    
                            <div className="col-span-full">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email:</label>
                                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="block w-full px-6 py-2.5 text-black bg-white/40 border
                                 border-gray-200 rounded-full appearance-none focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password:</label>
                                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-6 py-2.5 text-black
                                 bg-white/40 border border-gray-200 rounded-full appearance-none focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"/>
                            </div>

                            <div className="col-span-full">
                                <button type="button" onClick={handlseSignup} className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200
                                 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm
                                 focus-visible:ring-black">Signup</button>
                            
                            </div>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Signup

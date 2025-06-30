'use client'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const BACKEND_URL = 'https://todo-production-f715.up.railway.app'

const Navbar = () => {
    const {isAuthenticated, logout} = useAuth();
    const router = useRouter();

    const handleClick = () => {
        if(isAuthenticated){
            logout();
            router.push('/login')
        }else{
            router.push('/login')
        }
    }
    return (
        // <nav className='border rounded-3xl px-4 bg-white w-[80%] max-w-4xl mx-auto mt-4 flex items-center justify-between'>
        //     <div className=" text-black flex gap-4">
        //         <Link href={'/'}>Home</Link>
        //         <Link href={'/dashboard'}>Dashboard</Link>
        //     </div>

        //     <button onClick={handleClick} className="bg-blue-400 p-2 rounded-2xl px-4">{isAuthenticated ? "Logout" : "Login"}</button>
        // </nav>
        
            <nav className="flex justify-between p-2 items-center bg-white/20 shadow-xl ring-2 ring-black/5 rounded-full w-[80%] max-w-4xl mx-auto mt-4 h-12">
                <div className=" text-black flex gap-3">
                <button
                    className="relative inline-flex items-center justify-center gap-2 text-sm font-medium 
                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                    bg-zinc-900 hover:bg-zinc-400 text-gray-300 hover:text-black  h-9 rounded-full px-3 group">
                    <Link href={'/'}>Home</Link>

                </button>
                <button
                    className="cursor-pointer bg-zinc-900 relative inline-flex items-center justify-c gap-2 rounded-full text-sm font-medium 
                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-400 text-gray-300 hover:text-black 
                    h-9 px-3">
                        
                    <Link href={'/dashboard'}>Dashboard</Link>

                </button>
                </div>

               <button onClick={handleClick} className="bg-blue-500 gap-2 rounded-full text-sm font-medium 
                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-blue-300 text-gray-300 hover:text-blue-600 
                    h-9 px-3">
                
                {isAuthenticated ? "Logout" : "Login"}
               </button>

            </nav>

    )
}

export default Navbar

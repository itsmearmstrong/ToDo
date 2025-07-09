'use client'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter() 

    const {isAuthenticated } = useAuth();

    if(isAuthenticated){
        router.push('/dashboard')
    }

    return (
        <div className='w-full h-screen flex items-center'>

            {children}
        </div>
    )
}

export default Layout
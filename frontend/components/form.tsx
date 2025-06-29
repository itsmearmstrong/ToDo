'use client'
import React, { useState } from 'react'

const BACKEND_URL = 'http://localhost:8080'

const AddTodo = ({setTodos}: {setTodos: React.Dispatch<React.SetStateAction<never[]>>}) => {
    const [form, setForm] = useState({
        title: '',
        description: ''
    })
    
    const onSubmit = async() => {
        try {
            const token = localStorage.getItem('auth')
            const response = await fetch(`${BACKEND_URL}/create-todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form)
            })
            const data = await response.json();
            //@ts-ignore
            setTodos(p => [...p, data])
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    } 
    // return (
    //     <form>
    //         <input type="text" onChange={(e) => setForm({...form, title: e.target.value})} placeholder='Add a todo' className='w-full p-2 border rounded-2xl mb-4 text-black' />
    //         <input type="text" onChange={(e) => setForm({...form, description: e.target.value})} placeholder='Description' className='w-full p-2 border rounded-2xl mb-4 text-black' />
    //         <button type='button' onClick={onSubmit} className='bg-blue-400 p-2 rounded-2xl px-4'>Add</button>
    //     </form>
    // )

    return (
        <div className="flex flex-col items-center  justify-center light ">
            <div className="w-full max-w-md bg-white/20 ml-6 shadow-xl ring-2 ring-black/5 rounded-2xl p-6">
                <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
                    Add ToDo
                </h2>

                <form className="flex flex-col">
                    <input type="text" onChange={(e) => setForm({...form, title: e.target.value})}
                        className="bg-gray-100/20 text-slate-500 border-0 rounded-2xl p-2 mb-4 focus:bg-gray-200 focus:outline-none 
                        focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        placeholder="Title"
                    />

                    <input type="text" onChange={(e) => setForm({...form, description: e.target.value})}
                        className="bg-gray-100/20 text-gray-5100 border-0 rounded-2xl p-2 mb-4 focus:bg-gray-200 focus:outline-none 
                        focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        placeholder="Description"
                    />

                    <button type="button" onClick={onSubmit}
                        className="bg-blue-500/80 place-items-center text-white font-bold w-max m-auto px-6 py-2 rounded-full 
                        hover:bg-zinc-800 transition ease-in-out duration-150">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTodo
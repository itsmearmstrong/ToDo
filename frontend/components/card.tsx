import React, { useState } from 'react'
import { toast } from "sonner"

const BACKEND_URL = 'https://todo-production-f715.up.railway.app'

const Card = ({ title, desc, id, setFetch }: { title: string, desc: string, id: string, setFetch: any }) => {
    
  const [heading, setHeading] = useState(title)
  const [description, setDescription] = useState(desc)

  const token = localStorage.getItem('auth')
  const handleEdit = async () => {
    try {

      const body = {
        title: heading,
        description
      }

      const response = await fetch(`${BACKEND_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      })

      const data = await response.json();
      console.log(data);
      //@ts-expect-error error
      setFetch(p => !p)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        }
      })

      const data = await response.json();
      console.log(data);
      //@ts-expect-error error
      setFetch(p => !p)
      toast("Todo has been deleted", )

    } catch (error) {
      console.log(error)
    }
  }


//   return (
//     <div className='max-w-[300px] w-full text-black p-6 rounded-2xl flex flex-col gap-2 bg-white'>
//       <input value={heading} onChange={(e) => setHeading(e.target.value)} type="text" />
//       <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />

//       <button onClick={handleEdit} className='border p-1'>Edit</button>
//       <button onClick={handleDelete} className='border p-1'>Delete</button>


//     </div>
//   )



  return (

      <div className="flex flex-col bg-white/20 shadow-xl ring-2 ring-black/5 w-72 h-auto rounded-2xl py-4 px-6 ">
        <input value={heading} onChange={(e) => setHeading(e.target.value)} type="text" className="text-center  bg-white/0 font-bold text-xl text-white pb-4" />
        
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="text-base  bg-white/0 text-white pb-5" />

          <div className="flex justify-around items-center py-px">
              <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                  <svg className="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <button onClick={handleEdit} className="font-semibold text-sm text-green-700">Edit</button>
              </div>

              <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                  <svg className="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  <button onClick={handleDelete} className="font-semibold text-sm text-red-700">Delete </button>
              </div>
          </div>
      </div>

  )

}

export default Card

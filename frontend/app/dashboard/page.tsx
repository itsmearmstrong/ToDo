'use client'
import React, { useEffect, useState } from 'react'
import Card from '@/components/card';
import AddTodo from '@/components/form';
import CardLoader from '@/components/CardLoader';

const BACKEND_URL = 'https://todo-production-f715.up.railway.app'

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [fetchTodo , setFetch] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('auth')
    const fetchTodos = async () => {
      const response = await fetch(`${BACKEND_URL}/get-todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setTodos(data)
      setLoading(false); // <-- Set loading to false after data is fetched
    }

    fetchTodos()
  }, [fetchTodo])

  return (
    <div className=' w-full min-h-[90dvh] h-full flex justify-center gap-6 pt-6'>
      <div className="w-[20%] min-w-[300px]  h-full border-r pr-6">
        <AddTodo setTodos={setTodos}/>
      </div>

      <div className="w-[80%] h-full  flex flex-wrap gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardLoader key={i} />)
          : todos.map((todo: { id: string, title: string, description: string }) => (
              <Card key={todo.id} id={todo.id} title={todo.title} desc={todo.description} setFetch={setFetch} />
            ))
        }
      </div>
    </div>
  )
}

export default Dashboard

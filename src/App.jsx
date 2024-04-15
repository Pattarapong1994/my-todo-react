import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BASE_URL = 'https://65e166eba8583365b316482e.mockapi.io'

function App() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchTodo() {
    try {
      const response = await axios.get(`${BASE_URL}/todos`)
      setTodos(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function deleteTodo(id) {
    try {
      setIsLoading(true)
      await axios.delete(`${BASE_URL}/todos/${id}`)
      await fetchTodo()
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchTodo()
  }, [])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {
        !isLoading &&

        <div>
          {
            todos.map((todo, index) => (
              <div key={index}>
                {todo.id} {todo.name} {todo.status}

                <Link to={`/todo/${todo.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={async () => {
                  await deleteTodo(todo.id)
                }}>Delete</button>
              </div>
            ))
          }
        </div>
      }
    </>
  )

}

export default App

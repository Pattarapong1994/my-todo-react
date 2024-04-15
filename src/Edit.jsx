import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const BASE_URL = 'https://65e166eba8583365b316482e.mockapi.io'

function Edit() {
    const { id } = useParams()
    const [todo, setTodo] = useState({
        name: ''
    })

    async function fetchTodo(todoId) {
        try {
            const response = await axios.get(`${BASE_URL}/todos/${todoId}`)
            setTodo(response.data)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchTodo(id)
    }, [id])

    function handleNameChange(event) {
        setTodo((previousSatate) => ({
            ...previousSatate,
            name: event.target.value
        }))
    }

    async function updateName() {
        try {
            await axios.put(`${BASE_URL}/todos/${id}`, {
                name: todo.name
            })
            alert('update successful!')
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <>
            <div>
                Hello Edit Page {id}
            </div>
            <div>
                <input type="text" onChange={handleNameChange} value={todo.name} />

                {todo.status}
            </div>

            <button onClick={updateName}>Edit</button>
        </>
    )
}

export default Edit
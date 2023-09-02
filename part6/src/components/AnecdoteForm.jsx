import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      setNotification(`a new anecdote ${newAnecdote.content} created!`)
      setTimeout(() => {
        clearNotification()
      }, 5000)
    },
    onError: error => {
      setNotification(error.message)
      setTimeout(() => {
        clearNotification()
      }, 5000)
    },
    })//pitää siirtää formiin
    

  

  const { setNotification, clearNotification } = useNotification()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
    
    
  }



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

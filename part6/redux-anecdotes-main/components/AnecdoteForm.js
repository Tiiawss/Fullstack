import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notification } from "../reducers/notificationReducer"



const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value;
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notification('new anecdote ',content,3))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name = "anecdote" />
        </div>
        <button type = "submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
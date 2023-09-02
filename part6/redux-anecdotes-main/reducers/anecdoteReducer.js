import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdoteToChange = action.payload
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id === anecdoteToChange.id ? changedAnecdote : anecdote
      )
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const castVoteAnecdote = anecdote => {
  return async dispatch => {
    try {
      const votedAnecdote = await anecdoteService.vote(anecdote)
      dispatch(voteAnecdote(votedAnecdote.id))
    } catch (error){
      console.log('failed voting :', error)
    }
  }
}

export const updateVotes = (object) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(object.id, object)
    dispatch(voteAnecdote(newAnecdote))
  }
}
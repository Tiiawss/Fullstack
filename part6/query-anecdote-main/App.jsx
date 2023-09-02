import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote} from './requests'
import { useNotification } from './NotificationContext'

const App = () => {
  const { setNotification, clearNotification } = useNotification()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
    },//pitää siirtää formiin
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1 })//??
    setNotification(`anecdote '${anecdote.content}' voted`)
      setTimeout(() => {
        clearNotification()
      }, 5000)
  } 
  

  //pitää siirtää anecdoteformiin
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
  }
  
  const result = useQuery(
    'anecdotes', getAnecdotes)
  
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server </div>
  }

  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

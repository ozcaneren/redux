import { useState } from 'react'
import { addTodo } from '../redux/todos/todosSlice'
import { useDispatch } from 'react-redux'

function Form() {

  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(addTodo({ id: '' }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <input 
        className='new-todo' 
        placeholder='what needs to be done?' 
        autoFocus 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
    </form>
  )
}

export default Form
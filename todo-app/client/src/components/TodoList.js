import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import Error from './Error'
import { toggle, destroy, selectFilteredTodos, getAsyncTodos } from '../redux/todos/todosSlice'

function TodoList() {
  const dispatch = useDispatch()
  const filteredTodos = useSelector(selectFilteredTodos)
  const isLoading = useSelector((state) => state.todos.isLoading)
  const error = useSelector((state) => state.todos.error)


  useEffect(() => {
    dispatch(getAsyncTodos());
  }, [dispatch])

  const handleDestroy = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(destroy(id))
    }
  }

  if (isLoading) {
    return <Loading></Loading>
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TodoList

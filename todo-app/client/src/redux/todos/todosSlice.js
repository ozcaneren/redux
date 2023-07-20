import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAsyncTodos = createAsyncThunk('todos/getAsyncTodos', async () => {
  const res = await axios('http://localhost:7000/todos')
  return res.data;
})

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: 'all',
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => 
        {state.items.push(action.payload)
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        }
      }
    },
    toggle: (state, action) => {
      const { id } = action.payload
      const item = state.items.find((item) => item.id === id)
      item.completed = !item.completed
    },
    destroy: (state, action) => {
      const id = action.payload
      const filtered = state.items.filter((item) => item.id !== id)
      state.items = filtered
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false)
      state.items = filtered
    },
  },
  extraReducers: {
    [getAsyncTodos.pending]: (state, action) => {
      state.isLoading = true
    },
    [getAsyncTodos.fulfilled]: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    [getAsyncTodos.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    }
  },
})


export const selectTodos = state => state.todos.items

export const selectFilteredTodos = state => {
  if (state.todos.activeFilter === 'all') {
    return state.todos.items
  }

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === 'completed' ? todo.completed === false : todo.completed === true
  )
}

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions

export default todosSlice.reducer

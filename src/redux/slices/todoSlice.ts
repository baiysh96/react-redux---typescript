import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ITodo } from '../../models/IUser'

export const getTodos = createAsyncThunk(
  'user/getTodos',
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.get<ITodo[]>(
        'https://jsonplaceholder.typicode.com/todos',
      )
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользоватилей ')
    }
  },
)

interface TodoState {
  todos: ITodo[]
  title: string
  sort: string
  isLoading: boolean
  error: string
}
const initialState: TodoState = {
  todos: [],
  sort: '',
  title: '',
  isLoading: false,
  error: '',
}
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    sortedItem: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    getTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    clearField: (state) => {
      state.title = ''
    },
  },
  extraReducers: {
    [getTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload
      state.isLoading = false
      state.error = ''
    },
    [getTodos.pending.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.isLoading = true
    },
    [getTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { sortedItem, getTitle, clearField } = todoSlice.actions

export default todoSlice.reducer

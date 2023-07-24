import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async () => {
  const res = await axios(
    `${process.env.REACT_APP_API_BASE_ENDPOINT}/character/1,2,3,4,5,6,7,8,9,10`,
  )
  return res.data
}) 

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    items: [],
    isLoading: false
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = action.payload
      state.isLoading = false
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    }
  }
});

export default charactersSlice.reducer;
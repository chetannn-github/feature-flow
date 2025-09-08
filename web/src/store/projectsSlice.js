import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const fetchProjects = createAsyncThunk('projects/fetch', async (_, thunkAPI) => {
  const state = thunkAPI.getState()
  const res = await api.get('/api/projects', state.auth.token)
  return res
})

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending, state => { state.loading = true; state.error = null })
      .addCase(fetchProjects.fulfilled, (state, action) => { state.loading = false; state.list = action.payload })
      .addCase(fetchProjects.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
  }
})

export default projectsSlice.reducer

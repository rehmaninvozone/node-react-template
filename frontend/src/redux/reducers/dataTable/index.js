import { createSlice } from '@reduxjs/toolkit'

// ** Initial State
const initialState = {
  total: 1,
  params: {},
  allData: []
}

export const dataTableSlice = createSlice({
  name: 'DataTable',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
      state.params = action.payload.params
    }
  }
})


export const { setData } = dataTableSlice.actions
export default  dataTableSlice.reducer

import { configureStore } from "@reduxjs/toolkit"

// ** Reducers Imports
import layout from './layout'
import auth from './auth'
import dataTable from './dataTable'

const rootReducer = configureStore({
  reducer: {
    layout,
    auth,
    dataTable
  }
})
export default rootReducer

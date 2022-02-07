import { configureStore } from "@reduxjs/toolkit"

// ** Reducers Imports
import layout from './layout'
import auth from './auth'

const rootReducer = configureStore({
  reducer: {
    layout,
    auth
  }
})
export default rootReducer

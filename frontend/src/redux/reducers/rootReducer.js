import { configureStore } from "@reduxjs/toolkit"

// ** Reducers Imports
import layout from './layout'


const rootReducer = configureStore({
  reducer: {
    layout
  }
})
export default rootReducer

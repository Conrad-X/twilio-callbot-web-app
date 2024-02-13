import { configureStore } from '@reduxjs/toolkit'
import loggedinReducer from './slices/loggedinSlice'

export const store = configureStore({
  reducer: {
    loggedIn: loggedinReducer
  },
})
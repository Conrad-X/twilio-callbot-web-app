import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.value = action.payload.loggedIn
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn } = loggedInSlice.actions

export default loggedInSlice.reducer
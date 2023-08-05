import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isUserSignedIn: false
  },
  reducers: {
    setUserSignIn: (state, action) => {
      const { user } = action.payload
      state.user = user
      if (user != null) {
        state.isUserSignedIn = true
      }
    },
    setUserSignOut: (state, action) => {
      state.user = null
      state.isUserSignedIn = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserSignIn, setUserSignOut } = authSlice.actions

export default authSlice.reducer
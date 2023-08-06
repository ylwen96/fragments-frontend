import { createSlice } from '@reduxjs/toolkit'
import { isSignedIn } from '../../util/auth'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isUserSignedIn: isSignedIn()
  },
  reducers: {
    setUserSignIn: (state, action) => {
      const { user } = action.payload
      console.log("reducer",user)
      state.user = user
      state.isUserSignedIn = isSignedIn()
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
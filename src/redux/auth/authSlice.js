import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../util/auth'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isUserSignedIn: () => {
      const { username, idToken, accessToken } = getUser();
      return !!idToken && !!username && !!accessToken;
    }
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
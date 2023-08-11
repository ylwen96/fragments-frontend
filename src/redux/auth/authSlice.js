import { createSlice } from '@reduxjs/toolkit'
import { isSignedIn,getSessionValues } from '../../util/signInHelper'
import { defaultStorageExpirationDate } from '../../util/storageHelper';
import { createSignInSession, cleanupOnSignOut } from '../../util/signInHelper';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getSessionValues(),
    isUserSignedIn: isSignedIn()
  },
  reducers: {
    setUserSignIn: (state, action) => {
      const { idToken, accessToken, username, authorizationHeaders } = action.payload;
      createSignInSession(username, idToken, accessToken,authorizationHeaders, defaultStorageExpirationDate);
      state.user = { idToken, accessToken, username, authorizationHeaders }
      state.isUserSignedIn = true;
    },
    setUserSignOut: (state, action) => {
      cleanupOnSignOut();
      state.isUserSignedIn = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserSignIn, setUserSignOut } = authSlice.actions

export default authSlice.reducer
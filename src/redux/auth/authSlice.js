import { createSlice } from '@reduxjs/toolkit'
import { isSignedIn } from '../../util/signInHelper'
import { defaultStorageExpirationDate } from '../../util/storageHelper';
import { createSignInSession } from '../../util/signInHelper';
import { cleanupOnSignOut } from '../../util/signInHelper';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isUserSignedIn: isSignedIn()
  },
  reducers: {
    setUserSignIn: (state, action) => {
      const { idToken, accessToken, username } = action.payload;
      createSignInSession(username, idToken, accessToken, defaultStorageExpirationDate);
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
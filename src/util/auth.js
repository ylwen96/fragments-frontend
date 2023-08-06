// src/util/auth.js

import { Amplify, Auth } from 'aws-amplify';

// Configure our Auth object to use our Cognito User Pool
Amplify.configure({
  Auth: {
    // Amazon Region
    region: 'us-east-1',

    // Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_AWS_COGNITO_POOL_ID,

    // Amazon Cognito App Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,

    // Hosted UI configuration
    oauth: {
      // Amazon Hosted UI Domain
      domain: process.env.REACT_APP_AWS_COGNITO_HOSTED_UI_DOMAIN,

      // These scopes must match what you set in the User Pool for this App Client
      scope: ['email', 'profile', 'openid'],

      // NOTE: these must match what you have specified in the Hosted UI
      // app settings for Callback and Redirect URLs (e.g., no trailing slash).
      redirectSignIn: process.env.REACT_APP_OAUTH_SIGN_IN_REDIRECT_URL,
      redirectSignOut: process.env.REACT_APP_OAUTH_SIGN_OUT_REDIRECT_URL,

      // We're using the Access Code Grant flow (i.e., `code`)
      responseType: 'code',
    },
  },
});

/**
 * Get the authenticated user
 * @returns Promise<user>
 */
async function getUser() {
  try {
    // Get the user's info, see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

    // If that didn't throw, we have a user object, and the user is authenticated
    console.log('The user is authenticated');

    // Get the user's username
    const username = currentAuthenticatedUser.username;

    // Get the user's Identity Token, which we'll use later with our
    // microservice. See discussion of various tokens:
    // https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
    const idToken = currentAuthenticatedUser.signInUserSession.idToken.jwtToken;
    const accessToken = currentAuthenticatedUser.signInUserSession.accessToken.jwtToken;

    // Return a simplified "user" object
    return {
      username,
      idToken,
      accessToken,
      // Include a simple method to generate headers with our Authorization info
      authorizationHeaders: (type = 'application/json') => {
        const headers = { 'Content-Type': type };
        headers['Authorization'] = `Bearer ${idToken}`;
        return headers;
      },
    };
  } catch (err) {
    console.log(err);
    // Unable to get user, return `null` instead
    return null;
  }
}

async function signIn(usernameInput, password) {
  try {
    const user = await Auth.signIn(usernameInput, password);
    console.log(user)
    const username = user.username;
    const idToken = user.signInUserSession.idToken.jwtToken;
    const accessToken = user.signInUserSession.accessToken.jwtToken;
    return {
      username,
      idToken,
      accessToken,
      // Include a simple method to generate headers with our Authorization info
      authorizationHeaders: (type = 'application/json') => {
        const headers = { 'Content-Type': type };
        headers['Authorization'] = `Bearer ${idToken}`;
        return headers;
      },
    };
  } catch (error) {
    console.log(error)
  }
}

async function signUp(username, email, password) {
  try {
    const res = await Auth.signUp({
      username,
      password,
      attributes: {
        email,          // optional
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
    return res.user.username
  } catch (error) {
    console.log(error)
  }
}

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

async function resendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
    console.log("11111")
  } catch (error) {
    console.log('error resending code: ', error);
  }
}

async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
    console.log("222")
    return true
  } catch (error) {
    console.log('error confirming sign up', error);
    return false
  }
}

function isSignedIn() {
  const { username, idToken, accessToken } = getUser();
  return !!accessToken && !!username && !!idToken;
}

export { Auth, getUser, signIn, signUp, signOut, confirmSignUp, resendConfirmationCode, isSignedIn };
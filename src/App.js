import Home from "./pages/home/Home";

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <Home user={user} signOut={signOut}/>
    </>
  );
}

export default withAuthenticator(App);
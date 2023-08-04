// import { withAuthenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;

// export default withAuthenticator(App, {
//   signUpAttributes: ['email', 'name'],
// });

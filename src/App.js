import React from 'react';
import './App.css';

import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifyConfirmSignUp, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import Host from './game/Host.js'

const App = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

  
  return authState === AuthState.SignedIn && user ? (
    <div className="Host">
        <Host/>
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn
        slot="sign-in"
        usernameAlias="email"
      />
      <AmplifyForgotPassword
        slot="forgot-password"
        usernameAlias="email"
      />
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            required: true,
          }
        ]} 
      />
      <AmplifyConfirmSignUp
        slot="confirm-sign-up"
        formFields={[
          {
            type: 'email',
            label: 'Email',
            placeholder: 'Type your email',
            required: true,
          },
          {
            type: 'code',
            label: 'Code',
            placeholder: 'Type the confirmation code',
            required: true,
          },
          {
            type: 'password',
            label: 'Password',
            placeholder: 'Type your password',
            required: true,
          },
      ]}
    />
    </AmplifyAuthenticator>  
  );
}

export default App;
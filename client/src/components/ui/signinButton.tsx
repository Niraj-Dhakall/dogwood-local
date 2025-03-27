import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const SignInButton = () => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Handle the login response
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginError}
      useOneTap
    />
  );
};

export default SignInButton;

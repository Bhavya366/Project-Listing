import React from 'react';
import Feedback from './Feedback';
import '../App.css'
import LoginForm from './LoginForm';

const Login = ({setAuth}) => {
  return (
    <div className='login-register-page'>
      <div>
      <Feedback /></div><br></br>
      <div className='login-page'>
      <LoginForm  setAuth={setAuth} />
      </div>
    </div>
  );
};

export default Login;
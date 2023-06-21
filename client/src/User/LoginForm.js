import React from 'react';
import { useForm } from "react-hook-form"
import axios from 'axios';
import email from '../Images/mail.png';
import password from '../Images/password.png';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({setUser,setAuth,popUp}) => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    axios
      .post("http://localhost:4500/login",data)
      .then((res) => {
        console.log(res.data);
        setAuth(true)
        setUser(res.data.user.name)
        localStorage.setItem('token',JSON.stringify(res.data.token));
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input'>
          <img src={email} alt="" />&nbsp;
          <input {...register("email")} type="email" placeholder='Email' required />
        </div><br></br>
        <div className='input'>
          <img src={password} alt="" />&nbsp;
          <input {...register("password")} type="password" placeholder='Password' required />
        </div><br></br>
        {popUp?"":<p className='have-acc'>Don’t have an account?&nbsp;<Link to={'/register'}>Sign Up</Link></p>}<br></br>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
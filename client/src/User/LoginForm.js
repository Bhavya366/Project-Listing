import {React,useState} from 'react';
import { useForm } from "react-hook-form"
import axios from 'axios';
import email from '../Images/mail.png';
import password from '../Images/password.png';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';
import { useContext } from 'react';

const LoginForm = ({setAuth,show}) => {

  const navigate = useNavigate()
  const { text,loggedIn, setText,setLoggedIn } = useContext(MyContext);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error,setError] = useState("");
  

  const onSubmit = (data) => {
    
    axios
      .post("http://localhost:4500/login",data)
      .then((res)=>{
        // setAuth(true);
        if(res.data.error)
        setError("*"+res.data.error)
        // localStorage.setItem('isLoggedIn',true)
        else{
          localStorage.setItem('token',JSON.stringify(res.data.token));
          setText(false)
          setLoggedIn(true)
          navigate('/')
        }        
        }
      )
      .catch((err) => {
        console.log("error",err)
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
        <div><p className='have-acc'>Don’t have an account?&nbsp;<Link to={'/register'} >Sign Up</Link></p><br></br></div>
        {error && error.length>0?<p className='error'>{error}</p>:""}<br></br>
        <button>Login</button>        
      </form>
    </div>
  );
};

export default LoginForm;
import {React,useState} from 'react';
import email from '../Images/mail.png';
import password from '../Images/password.png';
import name from '../Images/name.png';
import mobile from '../Images/mobile.png';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './LoginForm';
import { useContext } from 'react';
import { MyContext } from '../MyContext';

const RegisterForm = (props) => {
    
    const { text, loggedIn,setText,setLoggedIn, show,setShow} = useContext(MyContext)
    const navigate = useNavigate();
    const [error,setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    

    const onSubmit = (data) => {
        axios
            .post("http://localhost:4500/register", data)
            .then((res) => {
                
                localStorage.setItem('token', JSON.stringify(res.data.token));
                setLoggedIn(true)
                setText(false)
                navigate('/')
                
            })
            .catch((error) => {
                if(error.response.data)
                setError("*"+error.response.data)
                console.log("Error:", error);
            });
    };
    
    return (
        <div>
            
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='input'>
                    <img src={name} alt="" />&nbsp;
                    <input {...register("name")} type="text" placeholder='Name' required />
                </div><br></br>
                <div className='input'>
                    <img src={email} alt="" />&nbsp;
                    <input {...register("email")} type="email" placeholder='Email' required />
                </div><br></br>
                <div className='input'>
                    <img src={mobile} alt="" />&nbsp;
                    <input {...register("mobile")} type="tel" placeholder='Mobile' required />
                </div><br></br>
                <div className='input'>
                    <img src={password} alt="" />&nbsp;
                    <input {...register("password")} type="password" placeholder='Password' required />
                </div><br></br>
                {(props.para)&&(
                    <p>Already have an account ?  <input type='button' style={{background:'none' , border:'none'}} value ='Sign In' onClick = {()=>setShow(true)} /> </p>
                )

                }

                {!(props.para)&&(
                         <p className='have-acc'>Already have an account?&nbsp; <Link to='/login'>Log in</Link></p>)
                }<br></br>
                
                {error?<p className='error'>{error}</p>:""}

                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default RegisterForm;
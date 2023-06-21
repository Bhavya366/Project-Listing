import {React,useState} from 'react';
import email from '../Images/mail.png';
import password from '../Images/password.png';
import name from '../Images/name.png';
import mobile from '../Images/mobile.png';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loginpopup from '../Components/Loginpopup';
import LoginForm from './LoginForm';

const RegisterForm = ({ setUser,setAuth,popUp}) => {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [clicked,setClicked]  = useState(false)
    const onSubmit = (data) => {
        axios
            .post("http://localhost:4500/register", data)
            .then((res) => {
                setAuth(true)
                setUser(res.data.user.name)
                localStorage.setItem('token', JSON.stringify(res.data.token));
                navigate('/')
            })
            .catch((error) => {
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
                    <input {...register("mobile")} type="text" placeholder='Mobile' required />
                </div><br></br>
                <div className='input'>
                    <img src={password} alt="" />&nbsp;
                    <input {...register("password")} type="password" placeholder='Password' required />
                </div><br></br>
                <p className='have-acc'>Already have an account?&nbsp;
                <Link to='/login'>Log in</Link></p><br></br>
                <button>Sign Up</button>
            </form>
            {popUp&&clicked ? <Loginpopup popUp={popUp} />:navigate('/')}
        </div>
    );
};

export default RegisterForm;
import React from 'react';
import Feedback from './Feedback';
import '../App.css'
import RegisterForm from './RegisterForm';


const Register = ({setUser,setAuth}) => {

    return (
        <div className='login-register-page'>
            <div><Feedback/></div><br></br>
            <div className='login-page'>
                <RegisterForm  setUser={setUser} setAuth={setAuth}/>
            </div>
        </div>
    );
};

export default Register;
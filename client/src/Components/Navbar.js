import React from 'react';
import { useNavigate } from 'react-router-dom'

const Navbar = ({ isAuthenticated, user }) => {

    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className='navbar'>
            <div>Feedback</div>
            <div>
                {!isAuthenticated && 
                <div>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/register")} className='btn-signup'>Sign Up</button>
                </div>
                }
                {isAuthenticated && 
                <div className='log-out-btns'>
                    <button onClick={()=>{logout()}}>Log out</button>
                    <p>Hello! {user}</p>
                </div>}
            </div>
        </div>
    );
};

export default Navbar;
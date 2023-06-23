import React from 'react';
import { useNavigate } from 'react-router-dom'
import profile from '../Images/profile.png'
import { useContext } from 'react';
import { MyContext } from '../MyContext';

const Navbar = ({ isAuthenticated, user }) => {

    const { text, loggedIn,setText,setLoggedIn } = useContext(MyContext)
    
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className='navbar'>
            <div>Feedback</div>
            <div>
                {!loggedIn && 
                <div>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/register")} className='btn-signup'>Sign Up</button>
                </div>
                }
                {loggedIn && 
                <div className='log-out-btns'>
                    <button onClick={()=>{logout()}}>Log out</button>
                    <p>Hello! </p>&nbsp;&nbsp;
                    <img src={profile} alt="" />
                </div>}
            </div>
        </div>
    );
};

export default Navbar;
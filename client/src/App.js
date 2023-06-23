import {React,useState} from 'react';
import { Route,Routes } from 'react-router-dom';
import Login from './User/Login';
import Register from './User/Register'
import MainPage from './Components/MainPage';
import './App.css';
import { MyContext } from "./MyContext";


const App = () => {
  
  const [text,setText] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  const [show,setShow] = useState(false);
  localStorage.setItem('edit',false)
  const [isAuthenticated ,setAuth]=useState(false)

  return (
    <>
    <MyContext.Provider value = {{text,loggedIn,setText,setLoggedIn,show,setShow}} >
    <Routes>      
      <Route path="/" element={<MainPage  isAuthenticated={isAuthenticated}  />} />
      <Route path="/register" element={<Register setAuth={setAuth} />}/>
      <Route path="/login" element={<Login setAuth={setAuth}  />}/>
    </Routes>
    </MyContext.Provider>
    </>
  );
};

export default App;
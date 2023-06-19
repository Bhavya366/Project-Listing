import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Login from './User/Login';
import Register from './User/Register'
import MainPage from './Components/MainPage';
import './App.css';

const App = () => {

  const [user,setUser]=React.useState("")
  const [isAuthenticated ,setAuth]=React.useState(false)

  return (
    <Routes>
      <Route path="/" element={<MainPage user={user} isAuthenticated={isAuthenticated}  />} />
      <Route path="/register" element={<Register setAuth={setAuth} setUser={setUser}/>}/>
      <Route path="/login" element={<Login setAuth={setAuth} setUser={setUser} />}/>
    </Routes>
  );
};

export default App;
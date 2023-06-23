import React from 'react';
import Navbar from './Navbar'
import Banner from './Banner';
import Footer from './Footer';
import ModalBody
 from './ModalBody';
const MainPage = ({ user, isAuthenticated}) => {
    let modal = localStorage.setItem('showModal',false)
    return (
        <div>
            <Navbar user = {user} isAuthenticated={isAuthenticated} />
            <Banner />
            <Footer user = {user} isAuthenticated={isAuthenticated} />
            <ModalBody />
        </div>
    );
};

export default MainPage;
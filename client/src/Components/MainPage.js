import React from 'react';
import Navbar from './Navbar'
import Banner from './Banner';
import Footer from './Footer';

const MainPage = ({ user, isAuthenticated}) => {
    return (
        <div>
            <Navbar user = {user} isAuthenticated={isAuthenticated} />
            <Banner />
            <Footer user = {user} isAuthenticated={isAuthenticated} />
        </div>
    );
};

export default MainPage;
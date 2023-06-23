import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../MyContext'
import { useState } from 'react';
import ProductForm from './Products/ProductForm';
import RegisterForm from '../User/RegisterForm'
import LoginForm from '../User/LoginForm'
import FeedbackProduct from './FeedbackProduct';
import './Modal.css';

const ModalBody = ({id}) => {

    const { text, loggedIn,setText,setLoggedIn,show,setShow } = useContext(MyContext);

    const [para , setPara] = useState(true)
    if(!text){
        return null;
    }
    
    return (
        <div className='pop-up-background'>
            <div  className='pop-up' >
            <div className='form-fr-add-product'>
                       
                        {(!loggedIn && !show) && (
                               <div><h3  className='heading'>Signup to continue</h3><br></br><RegisterForm para = {para}    /></div>
                                
                              )}
                               {
                                (!loggedIn && show) &&  (
                                    <LoginForm />
                                )
                              }
                               {loggedIn  && (
                                <><h3>Add your product </h3><br></br><ProductForm  /></>
                                     
                              )}
                              {loggedIn && JSON.parse(localStorage.getItem('edit')) ? <ProductForm id={id} />:""}
            </div>
            <div className='feedback-form'>
                <FeedbackProduct />
            </div>
        </div>
        </div>
    );
};

export default ModalBody;

import React from 'react';
import LoginForm from '../User/LoginForm'
import FeedbackProduct from './FeedbackProduct';

const Loginpopup = ({popUp}) => {
    
    return(
            <div className='pop-up'>
                <div className='form-fr-add-product'> 
                        <div>
                            <h3  className='heading'>Signup to continue</h3><br></br>
                            <LoginForm popUp={popUp} />
                        </div>
                </div>
                <div className='feedback-form'><FeedbackProduct /></div>
            </div>
    )
};

export default Loginpopup;
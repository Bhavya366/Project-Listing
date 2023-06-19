import React from 'react';
import ProductForm from './ProductForm';
import FeedbackProduct from './FeedbackProduct';
import RegisterForm from '../User/RegisterForm';


const AddProduct = ({ user, isAuthenticated,popUp}) => {
    return (
        <div className='pop-up-background'>
            <div className='pop-up'>
                <div className='form-fr-add-product'>
                    {isAuthenticated ?
                        <div>
                            <h3>Add your product </h3><br></br><ProductForm />
                        </div> :
                        <div>
                            <h3  className='heading'>Signup to continue</h3><br></br>
                            <RegisterForm user={user} isAuthenticated={isAuthenticated} popUp={popUp}/>
                        </div>}
                </div>
                <div className='feedback-form'><FeedbackProduct /></div>
            </div>
        </div>
    );
};

export default AddProduct;


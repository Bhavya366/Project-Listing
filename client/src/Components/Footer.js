import { React, useState } from 'react';
import AddProduct from './AddProduct';
import { set } from 'react-hook-form';
import ProductCard from './ProductCard';

const Footer = ({ user, isAuthenticated }) => {

    const [popUp, setPopUp] = useState(false);

    return (
        <>
            <div className='footer'>
                <div className='apply-filter'>
                    <h1>Feedback</h1>
                    <p>Apply Filter</p>
                </div>
                <div>
                    <div className='add-product-box'>
                        <div className='sort'>
                            <p><b>10 suggestions</b></p>
                            <p>Sort by:</p>
                        </div>
                        <button onClick={() => { setPopUp(true) }} style={{ borderRadius: "5px" }}>+ Add Product</button>
                    </div><br></br>
                    <div className="products" style={{ width: "100%" }}>
                        <ProductCard />
                    </div>
                </div>
            </div>
            {console.log(popUp)}
            {popUp ? <AddProduct user={user} isAuthenticated={isAuthenticated} popUp={popUp} /> : ""}

        </>
    );
};

export default Footer;
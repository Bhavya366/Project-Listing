import React from 'react';
import './Productcard.css'
import comment from '../Images/comment.png'

const ProductCard = () => {
    const skills = ['hi','bye','bye','hii']
    return (
                <div className="product-card selected-card">
                    <div className="card-left"> 
                        <div className="product-img">
                            <img alt="" src=""/>
                        </div>
                        <div className="product-des">
                            <div className="product-title">
                                <h2>hiihhihi</h2>
                            </div>
                            <div className="product-decription">
                                nkfbibmdfk
                            </div>
                            <div className='comment-section'>
                            <img src={comment} alt="" />&nbsp;
                            <p className='comment-btn'>Comment</p>
                            </div>  
                        </div>
                    </div>
                    <div className="card-right">
                        <div></div>
                    </div>
                </div>
    );
};

export default ProductCard;
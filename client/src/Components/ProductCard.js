import { React, useState } from 'react';
import './Productcard.css'
import comment from '../Images/comment.png'
import sortbycomments from '../Images/sortbycomments.png'

const ProductCard = ({ product }) => {

    const [show, setShow] = useState(false);

    const addComment = () => {
        setShow(true)
    }

    return (
        <div className="product-card selected-card">
            <div className='product-details'>
                <div className="card-left">
                    <div className="product-img">
                        <img alt="" src={product.addlogourl} />
                    </div>
                    <div className="product-des">
                        <div className="product-title">
                            <h3>{product.nameofthecompany}</h3>
                        </div>
                        <div className="product-decription">
                            <p>{product.adddescription}</p>
                        </div>
                        <div className='comment-section'>
                            {product.category.map((eachCategory, index) => {

                                return (<span key={index} className='product-card-category'>{eachCategory}</span>)
                            })}
                            <img src={comment} alt="" />&nbsp;
                            <p className='comment-btn' onClick={() => addComment(product.id)}>Comment</p>
                        </div>
                    </div>
                </div>
                <div className="card-right">
                    <div className='upvote-count'>
                        ^<br></br>{product.upvote}
                    </div>
                    <div className='comments-count'>
                        <span>{product.comments}0</span> <img src={sortbycomments} alt="" />
                    </div>
                </div>
            </div><br></br>
            <div>
                <input type="text" />

            </div>
        </div>
    );
};

export default ProductCard;
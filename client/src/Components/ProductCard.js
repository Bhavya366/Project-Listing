import { React, useState } from 'react';
import './Productcard.css'
import comment from '../Images/comment.png'
import sortbycomments from '../Images/sortbycomments.png'
import commentsend from '../Images/commentsend.png'
import axios from 'axios';

const ProductCard = ({ product }) => {

    const [show, setShow] = useState(false);

    const addComment = (id) => {
        setShow(true)
    }
    const storeComment = (event, nameofthecompany) => {
        event.preventDefault();
        const data = {
            nameofthecompany: nameofthecompany,
            comment: event.target[0].value,
        }
        axios.post('http://localhost:4500/comment', data)
            .then((res) => console.log(res))
            .catch((err) => { console.log(err) })
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
                            })} &nbsp;&nbsp;
                            <img src={comment} alt="" />&nbsp;
                            <p className='comment-btn' onClick={() => addComment()}>Comment</p>
                        </div>
                    </div>
                </div>
                <div className="card-right">
                    <div className='upvote-count'>
                        ^<br></br>{product.upvote}
                    </div>
                    <div className='comments-count'>
                        <span>{product.comments.length}</span> <img src={sortbycomments} alt="" />
                    </div>
                </div>
            </div><br></br>
            {show ?
                <div className='input-box-with-img'>
                    <form onSubmit={(event) => { storeComment(event, product.nameofthecompany) }}>
                        <div className='input_box'>
                            <input type="text" placeholder='Add a comment....' />
                            <button type='submit' className='commentsend-btn'><img src={commentsend} /></button>
                        </div>
                    </form>
                </div>
                : ""}<br></br>
            {show && product.comments ? <div>
                {product.comments ?
                    <div className='scrollable-div'>{product.comments.map((eachComment, index) => {
                        return (
                            <div className='each-comment-scrollable' key={index}>
                                <span className='dot'></span>
                                <p>{eachComment}</p>
                            </div>
                        )
                        
                    })}<br></br>
                    </div> : ""}</div> : ""}
        </div>
    );
};

export default ProductCard;
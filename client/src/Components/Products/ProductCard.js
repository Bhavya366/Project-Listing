import { React, useState } from 'react';
import './Productcard.css'
import comment from '../../Images/comment.png'
import sortbycomments from '../../Images/sortbycomments.png'
import commentsend from '../../Images/commentsend.png'
import axios from 'axios';
import ModalBody from '../ModalBody';
import ProductForm from './ProductForm';
import FeedbackProduct from '../FeedbackProduct';

const ProductCard = ({ product,isAuthenticated }) => {
    
    const [upvotes,setUpvotes] = useState(product.upvote);
    const [comments,setComments] = useState(product.comments);
    const [edit,setEdit] = useState(false)
    
    const [show, setShow] = useState(false);
    const addComment = () => {
        setShow(true)
    }
    const storeComment = (event, nameofthecompany) => {
        event.preventDefault();
        var oldComments = comments
        var newComments = event.target[0].value;
        oldComments.unshift(newComments);

        console.log(oldComments);
        const data = {
            nameofthecompany: nameofthecompany,
            comment: event.target[0].value,
        }
        axios.put('http://localhost:4500/comment',data)
        .then((res)=>{setComments(res.data.comments)})
        .catch((err)=>{console.log(err)})
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
                            <div style={{display:"flex"}}>
                                {product.category.map((eachCategory, index) => {
                                return (<span key={index} className='product-card-category'>{eachCategory}</span>)
                            })} &nbsp;&nbsp;
                            <div className='comment-btn-section'>
                                <img src={comment} alt="" />&nbsp;
                                <p className='comment-btn' onClick={() => addComment()}>Comment</p>
                            </div>
                        </div>
                        <div>{isAuthenticated? <button className='edit-btn' onClick={()=>{setEdit(true)}}>Edit</button>:""}</div>
                        </div>
                    </div>
                </div>
                <div className="card-right">
                    <div className='upvote-count'>
                        <button onClick={()=>{
                            setUpvotes(upvotes=>upvotes+1)
                            axios.put('http://localhost:4500/upvote',{
                                nameofthecompany:product.nameofthecompany,
                                upvote:upvotes,
                        }).then((res)=>{product.upvote = res.data.upvote})
                    }}>^<br></br>{product.upvote}</button>
                    </div>
                    <div className='comments-count'>
                        <span>{product.comments.length}</span>&nbsp;<img src={sortbycomments} alt="" />
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
                    <div className='scrollable-div'>{comments.map((eachComment, index) => {
                        return (
                            <div className='each-comment-scrollable' key={index}>
                                <span className='dot'></span>
                                <p>{eachComment}</p>
                            </div>
                        )
                    })}<br></br>
            </div> : ""}</div> : ""}
            {edit?<div className='pop-up-background'>
                    <div  className='pop-up' >
                            <div className='form-fr-add-product'>
                                <ProductForm id={product._id} />
                            </div>
                            <div className='feedback-form'>
                                <FeedbackProduct />
                            </div>
                    </div>
                </div>:"" }
        </div>
    );
};

export default ProductCard;
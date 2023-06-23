import { React, useState,useEffect } from 'react';
import ModalBody from './ModalBody';
import axios from 'axios';
import ProductCard from './Products/ProductCard';
import {useContext} from 'react'
import { MyContext } from '../MyContext';
import { Link } from 'react-router-dom';


const Footer = ({ user, isAuthenticated }) => {

    const {text,loggedIn,setText,setLoggedIn} = useContext(MyContext)
    localStorage.setItem('popUp',false);
    
    const [popUp, setPopUp] = useState(false);
    const [categories, setCategories] = useState([])
    const [products,setProducts] = useState([])
    const [selectedCategory,setSelectedCategory] = useState("All")
    
    useEffect(()=>{
        axios.get("http://localhost:4500/get-all-categories")
        .then((response) => { setCategories(response.data.categories)  })
        .catch((err) => { console.log("Error occuer while proccessing data") })  

        axios.get(`http://localhost:4500/?category=${selectedCategory}`)
        .then((response)=>{
            setProducts(response.data.product)
        })
        .catch((err)=>{console.log("Some Error has been occured while proccessing data")}) 
    },[selectedCategory])  
    
    const updateSort = (sort_name)=>{
        console.log(sort_name)
        axios.get(`http://localhost:4500/?category=${selectedCategory}&&sort=${sort_name}`)
        .then((response)=>{
            console.log(products)
            setProducts(response.data.product)
        })
        .catch((err)=>{console.log("Some Error has been occured while processing data",err)}) 
    }
    

    return (
        <>
            <div className='footer'>
                <div className='categories-list'>
                    <div className='apply-filter'>
                        <h1>Feedback</h1>
                        <p>Apply Filter</p>
                    </div><br></br>
                    <div className='filter-heading'>
                        Fliters : 
                    </div>
                    <div className='categories-box'>
                        <button onClick={()=>{setSelectedCategory("All")}}  className={selectedCategory == "All" ? "selected" : ""}>All</button>
                        {categories && categories.map((eachCategory,index)=>{
                            return <button className={selectedCategory == eachCategory ? "selected" : ""} key={index} onClick={()=>{setSelectedCategory(eachCategory)}}>{eachCategory}</button>
                        })}
                    </div>
                </div>
                <div>
                    <div className='add-product-box'>
                        <div className='sort'>
                            <p><b>{products.length} suggestions</b></p>&nbsp;
                            <span>Sort by:</span>
                            <select name="sort" className='options-sort' onChange={(event)=>{updateSort(event.target.value)}}>
                                <option value="upvote" >Upvote</option>
                                <option value="comments" >Comments</option>
                            </select>
                        </div>
                        <button onClick={()=>{setText(true)}} style={{ borderRadius: "5px" }}>+ Add Product</button>
                    </div><br></br>
                    <div className="products" style={{ width: "100%" }}>
                        {products.length>0?products.map((product,index)=>{return(
                            <div key={index}>
                                <ProductCard  product = {product} isAuthenticated ={isAuthenticated} />
                            </div>
                        )}):""}
                    </div>
                </div>
            </div>
            {/* {popUp ?<div><ModalBody user={user} isAuthenticated={isAuthenticated} popUp={popUp} /></div>: ""} */}
        </>
    );
};

export default Footer;
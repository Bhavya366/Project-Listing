import { React, useState,useEffect } from 'react';
import AddProduct from './AddProduct';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Footer = ({ user, isAuthenticated }) => {
    const [popUp, setPopUp] = useState(false);
    const [categories, setCategories] = useState([])
    const [products,setProducts] = useState([])
    const [selectedCategory,setSelectedCategory] = useState("All")
    const [sort,setSort] = useState("upvote")
    
    useEffect(()=>{
        axios.get("http://localhost:4500/get-all-categories")
        .then((response) => { setCategories(response.data.categories)  })
        .catch((err) => { console.log("Error occuer while proccessing data") })  

        axios.get(`http://localhost:4500/?category=${selectedCategory}&&sort=upvote`)
        .then((response)=>{
            setProducts(response.data.product)
        })
        .catch((err)=>{console.log("Some Error has been occured white pe")}) 
    },[selectedCategory,sort])  

    const updateSort = (sort_name)=>{
        axios.get(`http://localhost:4500/?category=${selectedCategory}&&sort=${sort_name}`)
        .then((response)=>{
            setProducts(response.data.product)
        })
        .catch((err)=>{console.log("Some Error has been occured white pe")}) 
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
                        <button>All</button>
                        {categories && categories.map((eachCategory,index)=>{
                            return <button className = "category-btn" key={index} onClick={()=>setSelectedCategory(eachCategory)}>{eachCategory}</button>
                        })}
                    </div>
                </div>
                <div>
                    <div className='add-product-box'>
                        <div className='sort'>
                            <p><b>{products.length} suggestions</b></p>&nbsp;
                            <span>Sort by:</span>
                            <select name="sort" className='options-sort' onChange={(event)=>{updateSort(event.target.value)}}>
                                <option value="upvote">Upvote</option>
                                <option value="comments">Comments</option>
                            </select>
                        </div>
                        <button onClick={() => { setPopUp(true) }} style={{ borderRadius: "5px" }}>+ Add Product</button>
                    </div><br></br>
                    <div className="products" style={{ width: "100%" }}>
                        {products.length>0?products.map((product,index)=>{return(
                            <div key={index}>
                                <ProductCard  product = {product} />
                            </div>
                        )}):""}
                    </div>
                </div>
            </div>
            {console.log(popUp)}
            {popUp ? <AddProduct user={user} isAuthenticated={isAuthenticated} popUp={popUp} /> : ""}
        </>
    );
};

export default Footer;
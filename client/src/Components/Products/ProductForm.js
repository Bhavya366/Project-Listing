import {React} from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalBody from '../ModalBody';
import { MyContext } from '../../MyContext';
import { useContext } from 'react';

const ProductForm = ({ setAuth ,id }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { text,loggedIn,setText,setLoggedIn } = useContext(MyContext);

    const onSubmit = (data) => {
        data.upvote = 0
        const headers = {token : JSON.parse(localStorage.getItem('token'))}
        if(id){
            data.id = id
            axios.put("http://localhost:4500/update-product",data,{headers:headers})
            .then((res)=>{
                    setText(false)            
            })
            .catch((err)=>{console.log(err)})
        }
        else{
            axios
          .post("http://localhost:4500/add-product",data, {
            headers: headers
          })
          .then((res) => {
            setText(false)            
          })
          .catch((error) => {
            console.log(error);
          });
        }
      };
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input'>
                    <input {...register("nameofthecompany")} type="text" placeholder='Name of the company' required />
                </div><br></br>
                <div className='input'>
                    <input {...register("category")} type="text" placeholder='Category' required />
                </div><br></br>
                <div className='input'>
                    <input {...register("addlogourl")} type="text" placeholder='Add logo url' required />
                </div><br></br>
                <div className='input'>
                    <input {...register("linkofproduct")} type="text" placeholder='Link of product' required />
                </div><br></br>
                <div className='input'>
                    <input {...register("adddescription")} type="text" placeholder='Add description' required />
                </div><br></br>
               <button >+ Add</button>
            </form>
            
        </div>
    );
};

export default ProductForm;
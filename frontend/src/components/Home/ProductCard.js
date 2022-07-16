import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {

  const navigate=useNavigate();
  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"gold",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  }

  return (
    <div className='productCard' onClick={()=>{navigate(`/product/${product._id}`)}}>
        <img src={product.images[0].url} alt = {product.name}/>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/>
            <span>{product.numOfReviews} Reviews</span> 
        </div>
        <span>{`₹${product.price}`}</span>
    </div>
  )
}

export default ProductCard
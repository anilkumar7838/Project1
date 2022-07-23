import React from 'react'
import {Link,useNavigate} from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import { Rating } from "@mui/lab";

const ProductCard = ({product}) => {

  const navigate=useNavigate();
    const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };

  return (
    <div className='productCard' onClick={()=>{navigate(`/product/${product._id}`)}}>
        <img src={product.images[0].url} alt = {product.name}/>
        <p>{product.name}</p>
        <div>
            <Rating style={{fontSize:"2vmax"}} {...options}/>
            <span>{product.numOfReviews} Reviews</span> 
        </div>
        <span>{`₹${product.price}`}</span>
    </div>
  )
}

export default ProductCard
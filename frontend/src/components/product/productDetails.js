import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useParams } from 'react-router-dom';
import "./productDetails.css";
import {ReactStars} from "react-rating-stars-component";
import { getProductDetails } from '../../actions/productActions';
import { Rating } from "@mui/lab";

// state not created
const ProductDetails = () => {
    const dispatch=useDispatch();
    const params = useParams();
    const{product,loading,error}= useSelector((state) => state.productDetails);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    useEffect(()=>{
        dispatch(getProductDetails(params.id))
    },[dispatch,params.id]);
  return (
    <Fragment>
        <div className="productDetails">
            <div className='section-1-1'>
                <Carousel>
                    {product && product.images ? product.images.map((item,i)=>{
                        return (<img className='CarouselImage'
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}/>)
                    }):null}
                </Carousel>
            </div>

            <div className='section-1-2'>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button 
                    // onClick={decreaseQuantity}
                    >-</button>
                    <input readOnly type="number" 
                    // value={quantity}
                     />
                    <button 
                    // onClick={increaseQuantity}
                    >+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    // onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
            <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
            </div>
            <button className="submitReview">Submit Review</button>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductDetails
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useParams } from 'react-router-dom';
import "./productDetails.css";
import { getProductDetails } from '../../actions/productActions';

// state not created
const ProductDetails = () => {
    const dispatch=useDispatch();
    const params = useParams();
    const{product,loading,error}= useSelector((state) => state.productDetails);
    console.log(product);

    useEffect(()=>{
        dispatch(getProductDetails(params.id))
    },[]);
  return (
    <Fragment>
        <div className="productDetails">
            <div>
                hello
                <Carousel>
                    {product.images && product.images.map((item,i)=>{
                        <img className='CarouselImg'
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}/>
                    })}
                </Carousel>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductDetails
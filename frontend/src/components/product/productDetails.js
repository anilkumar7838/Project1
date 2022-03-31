import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { getProductDetails } from '../../actions/productActions';


// state not created
const ProductDetails = ({match}) => {
    const dispatch=useDispatch()

    const{product,loading,error}= useSelector((state) => state.productDetails);

    useEffect(()=>{
        dispatch(getProductDetails(match.params.id))
    },[dispatch,match.params.id]);
  return (
    <Fragment>
        <div className="productDetails">
            <div>
                <Carousel>
                    {product.images && product.images.map((item,i)=>{
                        <img className='CarouselImg'
                        key={item.url}
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
import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../views/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import {useAlert} from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const Product = () => {
  const dispatch = useDispatch();
  const alert=useAlert();
  const params = useParams();
  const keyword=params.keyword;
  const [currentPage,setCurrentPage] = useState(1);
  const productResponse = useSelector((state) => state.products);

  const setCurrentPageNo =(e)=>{
    setCurrentPage(e);
  }
  useEffect(()=>{
    if(productResponse.error){
      alert.error(productResponse.error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage));
  },[dispatch,alert,productResponse.error,keyword,currentPage])
  return (
    <>
      {productResponse.loading ? <Loader/> : 
      <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {productResponse.products && productResponse.products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
          {
            productResponse.productCount && productResponse.productCount>0 ?
          <div className="paginationBox">
            <Pagination activePage={currentPage}
            itemsCountPerPage={productResponse.resultPerPage}
            totalItemsCount={productResponse.productCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"/>
          </div>:null
          }
      </Fragment>}
    </>
  )
}

export default Product
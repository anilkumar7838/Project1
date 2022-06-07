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

  const {products,loading,error,productCount,resultPerPage} = useSelector((state)=>state.products);

  const setCurrentPageNo =(e)=>{
    setCurrentPage(e);
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage));
  },[dispatch,alert,error,keyword,currentPage])
  return (
    <>
      {loading ? <Loader/> : 
      <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products && products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
          <div className="paginationBox">
            <Pagination activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"/>
          </div>
      </Fragment>}
    </>
  )
}

export default Product
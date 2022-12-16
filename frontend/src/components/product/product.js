import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../views/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import {useAlert} from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import MetaData from "../views/metaData";

const categories =[
  "Laptop",
  "Attire",
  "Camera",
  "Footwear",
  "Top",
  "Bottom",
  "SmartPhones"
];

const Product = () => {
  const dispatch = useDispatch();
  const alert=useAlert();
  const params = useParams();
  const keyword=params.keyword;

  const [currentPage,setCurrentPage] = useState(1);
  const [price,setPrice] = useState([0,300000])
  const [category,setCategory] = useState("")
  const [ratings,setRatings] = useState(0)

  const productResponse = useSelector((state)=>state.products);

  const setCurrentPageNo =(e)=>{
    setCurrentPage(e);
  }

  const priceHandler=(e,newPrice)=>{
    setPrice(newPrice);
  }


  useEffect(()=>{
    if(productResponse.error){
      alert.error(productResponse.error);
      dispatch(clearErrors());
    }
    // console.log(productResponse.productCount);
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  },[dispatch,alert,productResponse.error,keyword,currentPage,price,category,ratings])
  return (
    <>
      {productResponse.loading ? <Loader/> : 
      <Fragment>
        <MetaData title="Products--UnLimitIt"/>
        <div className="mainProduct">

          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {productResponse.products && productResponse.products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
              ))}
          </div>

            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-label="Small"
              aria-labelledby="range-slider"
              min={0}
              max={300000}
              />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category)=>{
                return(<li
                  className="category-link"
                  key={category}
                  onClick={()=>setCategory(category)}
                  >
                  {category}
                </li>)
              })}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e,newRating)=>{
                  setRatings(newRating);
                }}
                valueLabelDisplay="auto"
                aria-label="Small"
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                />
            </fieldset>

            </div>
          {
            productResponse.productCount && productResponse.productCount>0 && productResponse.resultPerPage < productResponse.productCount ?
          <div className="paginationBox">
            <Pagination activePage={currentPage}
            itemsCountPerPage={productResponse.resultPerPage}
            totalItemsCount={productResponse.productCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"/>
           </div>:null
          }
      </div>
      </Fragment>}
    </>
  )
}

export default Product
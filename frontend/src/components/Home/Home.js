import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import ProductCard from "./ProductCard.js";
import "./Home.css";
import Metadata from "../views/metaData";
import { clearErrors,getProduct } from "../../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../views/Loader/Loader.js";
import {useAlert} from "react-alert";

const Home = () => {
  const alert=useAlert();

  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <Metadata title="Un Limit It" />

          <div className="banner">
            <p>
              Welcome To <span style={{ fontWeight: "200" }}>Un Limit It</span>
            </p>
            <h1>Find Amazing Product Below</h1>

            <a href="#product">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <div className="homeheading">Featured Products</div>
          <div className="product" id="product">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

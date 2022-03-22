import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import ProductCard from "./ProductCard.js";
import "./Home.css";
import Metadata from "../views/metaData";
import { getProduct } from "../../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";

const product = {
  name: "Fancy-Tshirt",
  images: [
    {
      url: "https://rukminim2.flixcart.com/image/714/857/k05ljm80/t-shirt/c/2/g/xl-daredevil-party-wear-wrath-original-imafjzrzmchnjrfy.jpeg?q=50",
    },
  ],
  price: "300",
  _id: "Anil",
};

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
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
  );
};

export default Home;

import './App.css';
import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WebFont from "webfontloader";
import Header from './components/views/header/header.js';
import Footer from './components/views/footer/footer.js';
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/product/productDetails.js";
import Products from "./components/product/product.js";
import Search from "./components/product/search.js";
function App() {

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","chilanka"],
      }
    })
  },[]);

  return (
    <Router>
      <Header/>
      <Routes>
          <Route  path="product/:id" element={<ProductDetails/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

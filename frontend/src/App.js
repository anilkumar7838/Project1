import './App.css';
import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WebFont from "webfontloader";
import Header from './components/views/header/header.js';
import Footer from './components/views/footer/footer.js';
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/product/productDetails.js";
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
        <Route exact path="/product/:id" component={ProductDetails}/>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/product/:id" element={<ProductDetails/>}/> */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

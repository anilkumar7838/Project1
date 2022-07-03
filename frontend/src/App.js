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
import LoginSignUp from './components/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from './components/Route/protectedRoute';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","chilanka"],
      }
    });
    store.dispatch(loadUser())
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
        <Route path="/account" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/login" element={<LoginSignUp/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

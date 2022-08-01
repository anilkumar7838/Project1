import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./components/views/header/header.js";
import Footer from "./components/views/footer/footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/product/productDetails.js";
import Products from "./components/product/product.js";
import Search from "./components/product/search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/protectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import UserList from "./components/Admin/UsersList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/views/Contact/Contact"
import About from "./components/views/About/About"
import NotFound from "./components/views/Not Found/NotFound"

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <div className="app">
    <Router>
      <Header />
      <Routes>
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />{" "}
                </Elements>
              )}
            </ProtectedRoute>
          }
        />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
        />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute isAdmin={true}>
            <ProductList />
          </ProtectedRoute>
        }
        />
      <Route
        path="/admin/product"
        element={
          <ProtectedRoute isAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        }
        />
      <Route
        path="/admin/product/:id"
        element={
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct/>
          </ProtectedRoute>
        }
        />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute isAdmin={true}>
            <OrderList/>
          </ProtectedRoute>
        }
        />
      <Route
        path="/admin/order/:id"
        element={
          <ProtectedRoute isAdmin={true}>
            <ProcessOrder/>
          </ProtectedRoute>
        }
        />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute isAdmin={true}>
            <UserList/>
          </ProtectedRoute>
        }
        />
      <Route
        path="/admin/user/:id"
        element={
          <ProtectedRoute isAdmin={true}>
            <UpdateUser/>
          </ProtectedRoute>
        }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews/>
            </ProtectedRoute>
          }
          />
          <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>
    </Router>
      <Footer />
      </div>
  );
}

export default App;

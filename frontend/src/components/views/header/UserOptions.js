import React from 'react'
import { useState } from 'react'
import "./userOptions.css"
import { SpeedDial,SpeedDialAction } from '@mui/material'
import {logout} from "../../../actions/userAction"
import { ExitToApp,ListAlt,Dashboard ,ShoppingCart , Person} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import {Backdrop} from '@mui/material'

const UserOptions = ({user}) => {
    const alert=useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open,setOpen]=useState(false);
    // const { cartItems } = useSelector((state) => state.cart);
    const options = [
        { icon: <ListAlt/>, name: "Orders", func: orders },
        { icon: <Person/>, name: "Profile", func: account },
        // {
        //   icon: (
        //     <ShoppingCart
        //       style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        //     />
        //   ),
        //   name: `Cart(${cartItems.length})`,
        //   func: cart,
        // },
        { icon: <ExitToApp />, name: "Logout", func: logoutUser },
      ];

      if (user.role === "admin") {
        options.unshift({
          icon: <Dashboard/>,
          name: "Dashboard",
          func: dashboard,
        });
      }

      function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function account() {
        navigate("/account");
      }
      function cart() {
        navigate("/cart");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }

  return (
    <>
        <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial 
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
            />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
        
        </SpeedDial>  
    </>
  )
}

export default UserOptions
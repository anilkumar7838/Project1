import React from 'react'
import "./header.css"
import SearchIcon from "@mui/icons-material/Search"
import UserOptions from './UserOptions.js';
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import Avatar from "@mui/material/Avatar"
import AvatarImg from '../../../assets/userImage/Profile.png'
import Img from '../../../images.logo2.png'
import Sidebar from '../sidebar/sidebar.js'
import { useSelector } from 'react-redux';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Header = () => {
  const {isAuthenticated,user} = useSelector(state=>state.user)
  const navigate = useNavigate();
    return (
        <>
          <div className="header">
            <div className="header_info">
                <Sidebar />
                <img src={Img} id="header_img" alt="failed-to-fetch"/>
                <div className="info">
                  Un Limit It
                </div>
            </div>  
            <div className="header_right">
              {isAuthenticated ? <UserOptions user={user}/>:
              <>
              <IconButton onClick={()=>{navigate("/search")}}>
                <SearchIcon style={{fontSize:"2vmax"}}  id="search"/>
              </IconButton>
              <IconButton onClick={()=>{navigate("/cart")}}>
                <ShoppingBagIcon style={{fontSize:"2vmax"}}  id="search"/>
              </IconButton>
              <IconButton onClick={()=>{navigate("login")}}>
                <Avatar src={AvatarImg} alt="failed-to-fetch" id="userLogo"/>
              </IconButton>
              </>}
            </div>  

          </div>
        </>
    )
}

export default Header

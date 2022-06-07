import React from 'react'
import "./header.css"
import SearchIcon from "@mui/icons-material/Search"
// import AppIcon from "@mui/icons-material/Apps"
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import Avatar from "@mui/material/Avatar"
import AvatarImg from '../../../assets/userImage/Profile.png'
import Img from '../../../assets/logo/logo1.jpg'
import Sidebar from '../sidebar/sidebar.js'


const Header = () => {
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
            {/* <div className="header_search">
              <IconButton>
                <SearchIcon/>
              </IconButton>
                <input type="text" name="search" placeholder='search' />
            </div>   */}
            <div className="header_right">
              <IconButton onClick={()=>{navigate("/search")}}>
                <SearchIcon id="search"/>
              </IconButton>
              {/* <IconButton>
                <AppIcon/>
              </IconButton> */}
              <IconButton>
                <Avatar src={AvatarImg} alt="failed-to-fetch"/>
              </IconButton>
            </div>  

          </div>
        </>
    )
}

export default Header

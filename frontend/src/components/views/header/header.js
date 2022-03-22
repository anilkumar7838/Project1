import React from 'react'
import "./header.css"
import SearchIcon from "@mui/icons-material/Search"
// import AppIcon from "@mui/icons-material/Apps"
import { IconButton } from '@mui/material'
import Avatar from "@mui/material/Avatar"
import AvatarImg from '../../../assets/userImage/Profile.png'
import Img from '../../../assets/logo/logo1.jpg'
import Sidebar from '../sidebar/sidebar.js'


const header = () => {
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
              <IconButton>
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

export default header

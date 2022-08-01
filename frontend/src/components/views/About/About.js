import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/anilkumar.7838";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dz6kh7zfc/image/upload/v1657139877/avatars/dtievcszbtueywtomvao.jpg"
              alt="Founder"
            />
            <Typography>Anil Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea architecto ad reprehenderit, suscipit expedita obcaecati asperiores eos, quas esse unde quo culpa inventore atque consequuntur repellendus cupiditate.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UCgmfxtVBeraIOhhV61cR89w/featured"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/anilkumar.7838" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

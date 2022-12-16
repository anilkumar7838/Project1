import { Rating } from "@mui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  console.log(review.comments);

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p style={{fontSize:"1.6vmax"}}>{review.name}</p>
      <Rating {...options} style={{fontSize:"2vmax"}} />
      <span className="reviewCardComment">{review.comments}</span>
    </div>
  );
};

export default ReviewCard;

import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../views/metaData";
import Loader from "../views/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate=useNavigate();
  const userRes = useSelector((state) => state.user);
  console.log(userRes.isAuthenticated)
  useEffect(() => {
    if (!userRes.isAuthenticated) {
      navigate("/login");
    }

  }, [userRes.isAuthenticated]);
  return (
    <Fragment>
      {userRes.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${userRes.user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={userRes.user.avatar.url} alt={userRes.user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{userRes.user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{userRes.user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(userRes.user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

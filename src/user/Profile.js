import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../core/Menu";
import { Redirect, Link } from "react-router-dom";
import Dimg from "../images/avatar.png";
import DeleteUser from "./DeleteUser";

function Profile(props) {
  const [user, setUser] = useState("");
  const [redirectToSignin, setredirectToSignin] = useState(false);

  const getInfo = async (userId) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`,
        },
      });
      res = await res.json();
    
      if (res.error) {
        console.log("ERROR");
        setredirectToSignin(true);
      } else {
        setUser(res);
       
      }
    } catch (error) {
      console.log("ERROR");
      setredirectToSignin(true);
    }
  };

  useEffect(() => {
    const userId = props.match.params.userId;
    getInfo(userId);
  }, []);

  useEffect(() => {
    const userId = props.match.params.userId;
    getInfo(userId);
  }, [props.match.params.userId]);
  
  useEffect(() => {
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
  }, [redirectToSignin]);

  const photoUrl = user._id
  ? `${
      process.env.REACT_APP_API_URL
    }/user/photo/${user._id}?${new Date().getTime()}`
  : Dimg;
    
  return (
    <div className="container">
      <div className="row">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="col-md-6">
        <img  style={{ height: "200px", width: "auto" }}
          className="img-thumbnail" src={photoUrl}    onError={i => (i.target.src = `${Dimg}`)}
          alt={user.name}/>
        </div>

        <div className="col-md-6">
          <div className="lead ml-5 mt-2">
            <p>Hello {user.name}</p>
            <p>Email : {user.email}</p>
            <p>{`Joined ${new Date(user.createdAt).toDateString()}`}</p>
          </div>

          {isAuthenticated() && isAuthenticated().user._id === user._id && (
            <div className="d-inline-block">
              <Link
                className="btn btn-raised btn-success me-5"
                to={`/user/edit/${user._id}`}
              >
                Edit Profile
              </Link>

              <DeleteUser userId={user._id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

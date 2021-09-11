import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../core/Menu";
import { Redirect, Link } from "react-router-dom";
import Dimg from "../images/avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";

function Profile(props) {
  const [user, setUser] = useState({ following: [], followers: [] });
  const [following, setFollowing] = useState(false);
  const [error, setError] = useState("");
  const [redirectToSignin, setredirectToSignin] = useState(false);
  const [photoUrl,setPhotoUrl]=useState(user._id
    ? `${process.env.REACT_APP_API_URL}/user/photo/${
        user._id
      }?${new Date().getTime()}`
    : Dimg)

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
       
        let followin = checkFollow(res);
        setUser(res);
        setFollowing(followin);
      }
    } catch (error) {
      console.log("ERROR");
      setredirectToSignin(true);
    }
  };

  const checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.length>0?user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    }):false
    return match;
  };

  const clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    if (callApi === "follow") {
      follow(userId, token, user._id)
        .then((data) => {
          if(data.error){
            setError(data.error);
          }
          setUser(data);
          setFollowing(!following);
        })
        .catch((error) => {
          setError(error);
        });
    } else if (callApi === "unfollow") {
      unfollow(userId, token, user._id)
        .then((data) => {
          setUser(data);
          setFollowing(!following);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }

    const follow = async (userId, token, followId) => {
      try {
        let res=await fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, followId }),
        })
        return res.json();
      }
       catch (err) {
        console.log(err);
      }
    };

    const unfollow = async (userId, token, unfollowId) => {
      try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, unfollowId }),
        });
        return res.json();
      } catch(err){
        console.log(err);
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

    useEffect(() => {
      const photo=user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : Dimg;
      setPhotoUrl(photo);
   
    }, [user._id])

     
    return (
      <div className="container">
        <div className="row">
          <h2 className="mt-5 mb-5">Profile</h2>
          <div className="col-md-6">
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={(i) => (i.target.src = `${Dimg}`)}
              alt={user.name}
            />
          </div>

          <div className="col-md-6">
            <div className="lead ml-5 mt-2">
              <p>Hello {user.name}</p>
              <p>Email : {user.email}</p>
              <p>{`Joined ${new Date(user.createdAt).toDateString()}`}</p>
            </div>

            {isAuthenticated() && isAuthenticated().user._id === user._id ? (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-success me-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>

                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                onButtonClick={clickFollowButton}
                following={following}
              />
            )}

            <hr />
            
            <ProfileTabs followers={user.followers} following={user.following}/>
           
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
          </div>
        </div>
      </div>
    );
  };
export default Profile;

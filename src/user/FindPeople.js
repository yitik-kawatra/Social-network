import React, { useState, useEffect } from "react";
import Dimg from "../images/avatar.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../core/Menu";

function FindPeople() {
  const [users, setUsers] = useState([]);

  const findPeople = async (userId) => {
    const token = isAuthenticated().token;
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res = await res.json();
      if (res.error) {
        console.log("Error");
      } else {
        setUsers(res);
      }
    } catch (error) {
        console.log(error);
    }
  };


  const follow = async (followId) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
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
      res = await res.json();
      if (res.error) {
        console.log("Error");
      } else {
       findPeople(isAuthenticated().user._id);
      }
    } catch (error) {
        console.log(error);
    }
  };
  
  useEffect(() => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token);
  }, []);
 

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Find People</h2>

      <div className="row">
        {users.map((user, i) => (
          <div className="card col-md-4" key={i}>
            <div
              className="bg-image hover-overlay ripple"
              data-mdb-ripple-color="light"
            >
              <img
                style={{ height: "200px", width: "auto" }}
                className="img-thumbnail"
                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                onError={(i) => (i.target.src = `${Dimg}`)}
                alt={user.name}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                to={`/user/${user._id}`}
                className="btn btn-raised float-left btn-sm btn-primary me-5 "
              >
                View Profile
              </Link>
              <button
                onClick={()=>follow(user._id)}
                className="btn btn-raised btn-info float-right btn-sm"
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindPeople;

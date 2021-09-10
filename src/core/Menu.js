import React from "react";
import { Link, withRouter } from "react-router-dom";

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const  signout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  let res = await fetch("http://localhost:5500/signout", {
    method: "GET",
  });
  return res.json();
};

function Menu({ history }) {
  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
  };

  const signot=()=>{
    signout().then(data=>{
      if(data.error){
        console.log(data.error);
      }
      else{
        history.push('/');
      }
      
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <div>
      <ul className="nav nav-tabs mb-3 bg-secondary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/users")} to="/users">
            Users
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                style={isActive(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={isActive(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                onClick={signot}
                style={isActive(history, "/signout")}
                className="nav-link"
                to="/signout"
              >
                Sign Out
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/user/${isAuthenticated().user._id}`}
                className="nav-link"
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);

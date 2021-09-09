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

function Menu({ history }) {
  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
  };

  const signout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    let res = await fetch("http://localhost:5500/signout", {
      method: "GET",
    });
    history.push("/");
    return res.json();
  };

  return (
    <div>
      <ul className="nav nav-tabs mb-3 bg-secondary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
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
                onClick={signout}
                style={isActive(history, "/signout")}
                className="nav-link"
                to="/signout"
              >
                Sign Out
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
              >
                {isAuthenticated().user.name}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);

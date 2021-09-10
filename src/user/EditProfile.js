import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../core/Menu";
import { useHistory } from "react-router-dom";

function EditProfile(props) {
  let history = useHistory();
  const [info, setInfo] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const isValid = () => {
    const { name, email, password } = info;

    if (name.length === 0) {
      setError("Name is required");
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("A valid Email is required");
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

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
      } else {
        setInfo({
          id: res._id,
          name: res.name,
          email: res.email,
          password: "",
        });
      }
    } catch (error) {
      console.log("ERROR");
    }
  };

  const handleChange = (name, e) => {
    setInfo({ ...info, [name]: e.target.value });
  };
  const clickSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const { name, email, password } = info;
      const user = {
        name,
        email,
        password: password || undefined,
      };
      console.log(user);
      try {
        let res = await fetch(
          `${process.env.REACT_APP_API_URL}/user/${info.id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${isAuthenticated().token}`,
            },
            body: JSON.stringify(user),
          }
        );
        res = await res.json();
        if (res.error) {
          console.log(res.error);
        } else {
          history.push(`/user/${info.id}`);
        }
      } catch (err) {
        setInfo({ ...info, error: err });
      }
    }
  };

  useEffect(() => {
    const userId = props.match.params.userId;
    getInfo(userId);
  }, []);
  return (
    <div className="container">
      <h2 className="mt-5 mb-5"> Edit Profile</h2>

      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>

      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={(e) => handleChange("name", e)}
            type="text"
            className="form-control"
            value={info.name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={(e) => handleChange("email", e)}
            type="email"
            className="form-control"
            value={info.email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={(e) => handleChange("password", e)}
            type="password"
            className="form-control"
            value={info.password}
          />
        </div>

        <button
          onClick={clickSubmit}
          className="btn btn-raised btn-primary mt-5"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProfile;

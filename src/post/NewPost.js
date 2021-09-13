import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../core/Menu";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

function NewPost() {
  const [user, setUser] = useState({});
  const [post, setPost] = useState({
    title: "",
    body: "",
    photo: "",
    error: "",
    fileSize: 0,
    loading: false,
    redirectToProfile: false,
  });
  const [postData, setPostData] = useState(null);

  const isValid = () => {
    const { title, body, fileSize} = post;
    if (fileSize > 100000) {
      setPost({
        ...post,
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      setPost({ ...post, error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  const handleChange = (name, event) => {
    setPost({ ...post, error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    postData.set(name, value);
    setPost({ ...post, [name]: value, fileSize });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setPost({ ...post, loading: true });

    if (isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, postData).then((data) => {
        if (data.error) {
          setPost({ ...post, error: data.error });
        } else {
          setPost({
            ...post,
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true,
          });
        }
      });
    }
  };
  useEffect(() => {
    setPostData(new FormData());
    setUser(isAuthenticated().user);
  }, []);


  if (post.redirectToProfile) {
    return <Redirect to={`/user/${user._id}`} />;
}
  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Create a new post</h2>
      <div
        className="alert alert-danger"
        style={{ display: post.error ? "" : "none" }}
      >
        {post.error}
      </div>

      {post.loading ? (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}

      <form>
        <div className="form-group">
          <label className="text-muted">Post Photo</label>
          <input
            onChange={(e) => handleChange("photo", e)}
            type="file"
            accept="image/*"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            onChange={(e) => handleChange("title", e)}
            type="text"
            className="form-control"
            value={post.title}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Body</label>
          <textarea
            onChange={(e) => handleChange("body", e)}
            type="text"
            className="form-control"
            value={post.body}
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-raised btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;

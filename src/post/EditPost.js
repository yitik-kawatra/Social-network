import React, { useState, useEffect } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../core/Menu";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/tree.webp";

function EditPost(props) {
  const [post, setPost] = useState({
    id: "",
    title: "",
    body: "",
    fileSize: 0,
  });
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [error, setError] = useState("");

  const getPost = (postId) => {
    singlePost(postId).then((data) => {
      if (data.error) {
        setRedirectToProfile(true);
      } else {
        setPost({ ...post, id: data._id, title: data.title, body: data.body });
      }
    });
  };

  const isValid = () => {
    const { title, body, fileSize } = post;
    if (fileSize > 100000) {
      setError("File size should be less than 100kb");
      setLoading(false);
      return false;
    }

    if (title.length === 0 || body.length === 0) {
      setError("All fields are required");
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleChange = (name, event) => {
    setError("");
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    postData.set(name, value);
    setPost({ ...post, [name]: value, fileSize });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (isValid()) {
      const postId = post.id;
      const token = isAuthenticated().token;

      update(postId, token, postData).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setLoading(false);
          setPost({ ...post, title: "", body: "" });
          setRedirectToProfile(true);
        }
      });
    }
  };

  const imgSource=post.id?`${
    process.env.REACT_APP_API_URL
}/post/photo/${post.id}?${new Date().getTime()}`:DefaultPost;

  useEffect(() => {
    setPostData(new FormData());
    const postId = props.match.params.postId;
    getPost(postId);
  }, []);

  if (redirectToProfile) {
    return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">{post.title}</h2>

      <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={imgSource}
                    // onError={i => (i.target.src = `${DefaultPost}`)}
                    alt={post.title}
                />
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
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;

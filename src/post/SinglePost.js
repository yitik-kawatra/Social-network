import React, { useState, useEffect } from "react";
import { singlePost } from "./apiPost";
import DefaultPost from "../images/tree.webp";
import { Link } from "react-router-dom";

function SinglePost(props) {
  const [post, setPost] = useState("");

  const renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    return (
      <div className="card-body">
        <img
          src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
          alt={post.title}
          onError={(i) => (i.target.src = `${DefaultPost}`)}
          className="img-thunbnail mb-3"
          style={{
            height: "300px",
            width: "100%",
            objectFit: "cover",
          }}
        />

        <p className="card-text">{post.body}</p>
        <br />
        <p className="font-italic mark">
          Posted by <Link to={`${posterId}`}>{posterName} </Link>
          on {new Date(post.created).toDateString()}
        </p>
        <Link to={`/`} className="btn btn-raised btn-primary btn-sm">
          Back to posts
        </Link>
      </div>
    );
  };
  useEffect(() => {
    const postId = props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPost(data);
      }
    });
  }, []);
  console.log(post);
  return (
    <div className="container">
      <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

      {!post ? (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      ) : (
        renderPost(post)
      )}
    </div>
  );
}

export default SinglePost;

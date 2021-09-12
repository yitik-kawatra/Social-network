import React, { useState, useEffect } from "react";
import { posts as list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultPost from "../images/tree.webp";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts([...data]);
      }
    });
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">
        {!posts.length ? "Loading..." : "Recent Posts"}
      </h2>
      <div className="row">
        {posts.map((post, i) => {
          let posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          let posterName = post.postedBy ? post.postedBy.name : " Unknown";
          return (
            <div className="card col-md-4" key={i}>
              <div className="card-body">
                <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={(i) => (i.target.src = `${DefaultPost}`)}
                  className="img-thunbnail mb-3"
                  style={{ height: "200px", width: "auto" }}
                />
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 100)}</p>
                <br />
                <p className="font-italic mark">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;

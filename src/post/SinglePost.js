import React, { useState, useEffect } from "react";
import { singlePost,remove } from "./apiPost";
import DefaultPost from "../images/tree.webp";
import { Link,Redirect } from "react-router-dom";
import { isAuthenticated } from "../core/Menu";

function SinglePost(props) {
  const [post, setPost] = useState("");
  const [redirects,setRedirects]=useState({redirectToHome: false,redirectToSignin: false})


  const deletePost = () => {
    const postId = post._id
    const token = isAuthenticated().token;
    remove(postId, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setRedirects({...redirects,redirectToHome:true})
        }
    });
};

const deleteConfirmed = () => {
  let answer = window.confirm('Are you sure you want to delete your post?');
  if (answer) {
    deletePost();
  }
};

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
        <Link to="/" className="btn btn-raised btn-primary btn-sm me-5">
          Back to posts
        </Link>
        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                        <>
                              <Link to={`/post/${post._id}`} className="btn btn-raised btn-warning btn-sm me-5">
                                Update Post
                            </Link>
                            <button onClick={deleteConfirmed} className="btn btn-raised btn-danger btn-sm">
                                Delete Post
                            </button>
                        </>
                    )}
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
 

  if (redirects.redirectToHome) {
    return <Redirect to={`/`} />; 
  } else if (redirects.redirectToSignin) {
    return <Redirect to={`/signin`} />;
  }
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

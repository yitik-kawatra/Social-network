import React from 'react'

function FollowProfileButton(props) {
    return (
        <div className="d-inline-block">
                {!props.following ? (
                    <button
                       onClick={()=>{props.onButtonClick("follow")}}
                        className="btn btn-success btn-raised mr-5"
                    >
                        Follow
                    </button>
                ) : (
                    <button
                    onClick={()=>{props.onButtonClick("unfollow")}}
                        className="btn btn-warning btn-raised"
                    >
                        UnFollow
                    </button>
                )}
            </div>
    )
}

export default FollowProfileButton

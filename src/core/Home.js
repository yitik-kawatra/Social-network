import React from 'react'
import Posts from "../post/Posts"

function Home() {
    return (
        <div>
            <div className="jumbotron">
            <h2>Home</h2>
            </div>
            <div className="container">
                <Posts />
            </div>
        </div>
    )
}

export default Home

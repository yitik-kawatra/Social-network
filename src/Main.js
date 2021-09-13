import React from 'react'
import {Route,Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu'
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile'
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import FindPeople from './user/FindPeople';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';


function Main() {
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/post/create" component={NewPost} />
                <Route path="/post/edit/:postId" component={EditPost} />
                <Route path="/post/:postId" component={SinglePost} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} /> 
                <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                <PrivateRoute path="/user/:userId" component={Profile} />
                <PrivateRoute path="/findpeople" component={FindPeople} />
               
                <Route path="/users" component={Users}/>
            </Switch>
        </div>
    )
}

export default Main

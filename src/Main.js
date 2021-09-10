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


function Main() {
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} /> 
                <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                <PrivateRoute path="/user/:userId" component={Profile} />
                <Route path="/users" component={Users}/>
               
                
            </Switch>
        </div>
    )
}

export default Main

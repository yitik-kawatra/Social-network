import React from 'react'
import {Route,Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu'
import Signup from './user/Signup';
import Signin from './user/Signin';
function Main() {
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
            </Switch>
        </div>
    )
}

export default Main

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

import StartUp from './components/pages/StartUp';
import ShapeSelect from './components/pages/ShapeSelect';
import SquareCalc from './components/pages/SquareCalc';
import CircleCalc from './components/pages/CircleCalc';
import SemiCircleCalc from './components/pages/SemiCircleCalc';
// import ThreeD from './components/ThreeD';
import 'bootstrap/dist/css/bootstrap.min.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "./login";
    }
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/startup" component={StartUp} />
                        <Route exact path="/shapeSelect" component={ShapeSelect} />
                        <Route exact path="/squareCalc" component={SquareCalc} />
                        <Route exact path="/circleCalc" component={CircleCalc} />
                        <Route exact path="/semi-CircleCalc" component={SemiCircleCalc} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;

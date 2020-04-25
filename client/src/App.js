import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

// import "./App.css";

// import StartUp from './components/pages/StartUp';
// import ShapeSelect from './components/pages/ShapeSelect';
// import SquareCalc from './components/pages/SquareCalc';
// import CircleCalc from './components/pages/CircleCalc';
// import SemiCircleCalc from './components/pages/SemiCircleCalc';
// // import ThreeD from './components/ThreeD';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <div className='container'>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/navBar";
import Landing from "./components/Landing/landing";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import Profile from "./components/Profile/profile";

import "./App.css";

import StartUp from './components/pages/StartUp/startUp';
import ShapeSelect from './components/pages/ShapeSelect/shapeSelect';
import SquareCalc from './components/pages/SquareCalc/squareCalc';
import CircleCalc from './components/pages/CircleCalc/circleCalc';
import SemiCircleCalc from './components/pages/SemiCircleCalc/semiCircleCalc';
import Footer from './components/Footer/footer';
import PushDiv from './components/Footer/pushDiv';
import Projects from './components/Projects/projects';

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
                            <Route exact path="/startUp" component={StartUp} />
                            <Route exact path="/shapeSelect" component={ShapeSelect} />
                            <Route exact path="/squareCalc" component={SquareCalc} />
                            <Route exact path="/circleCalc" component={CircleCalc} />
                            <Route exact path="/semiCircleCalc" component={SemiCircleCalc} />
                            <Route exact path="/projects" component={Projects} />
                        </div>
                        <PushDiv />
                    </div>
                    <Footer/>
                </Router>
        );
    }
}
export default App;

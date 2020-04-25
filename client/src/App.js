import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartUp from './components/pages/StartUp';
import ShapeSelect from './components/pages/ShapeSelect';
import SquareCalc from './components/pages/SquareCalc';
import CircleCalc from './components/pages/CircleCalc';
import SemiCircleCalc from './components/pages/SemiCircleCalc';
// import ThreeD from './components/ThreeD';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router >
            <div >
                <Route exact path="/" component={StartUp} />
                <Route exact path="/shapeSelect" component={ShapeSelect} />
                <Route exact path="/squareCalc" component={SquareCalc} />
                <Route exact path="/circleCalc" component={CircleCalc} />
                <Route exact path="/semi-CircleCalc" component={SemiCircleCalc} />
            </div>
        </Router>

    );
}

export default App;

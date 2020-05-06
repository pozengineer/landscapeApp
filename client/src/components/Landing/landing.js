import React, { Component } from "react";
import * as THREE from "three";
import ThreeDText from '../ThreeText/threeText';
import MediaQuery from 'react-responsive';

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = { matches: window.matchMedia("(min-width: 992px)").matches };
      }
    
      componentDidMount() {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 768px)").addListener(handler);
      }

    render() {
        return (
            <div className="container">
                {/* <div className="jumbotron mt-5"> */}
                    <div className='col-sm-12 mx-auto'>
                        {/* <h1 className='text-center'>WELCOME</h1> */}
                        {this.state.matches && (<ThreeDText size={30} />)}
                        {!this.state.matches && (<ThreeDText size={14} />)}
                    </div>
                {/* </div> */}
            </div>
        );
    }
}

export default Landing;
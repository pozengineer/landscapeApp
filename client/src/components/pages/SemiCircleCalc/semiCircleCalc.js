import React, { Component } from "react";
// import "./style.css";
import * as THREE from "three";
import ThreeD from '../../ThreeD/threeDXaxis';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { getMaterials, addProject } from '../../UserFunctions/userFunctions';
import Select from "react-select";

class semiCircleCalc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            planter_name: '',
            radius: '',
            height: '',
            errors: {},
            geometry: '',
            materialArray: [],
            selectValue: '',
            material: [],
            volume: '',
            chosenMaterial: '',
            reqTonne: '',
            reqCost: '',
            matches: window.matchMedia("(min-width: 922px)").matches
        }

        this.onChange = this.onChange.bind(this);
        this.onCalculate = this.onCalculate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChanged = this.onSelectChanged.bind(this);
    }

    semiCircle = element => {
        let geometry;
        // path to extrude along
        // var path = new THREE.CatmullRomCurve3([
        //     new THREE.Vector3(0, 0, 0),
        //     new THREE.Vector3(10, 10, 10),
        //     new THREE.Vector3(20, 10, 20)
        // ]);

        // points that define shape
        var pts = [];
        var numPoints = 25;
        var radius = 3;

        for (var i = 0; i < numPoints; i++) {

            var a = Math.PI * i / numPoints;
            pts.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius));

        }

        // shape to extrude
        var shape = new THREE.Shape(pts);

        // extrude options
        var options = {
            amount: 3,              // default 100, only used when path is null
            bevelEnabled: false,
            bevelSegments: 0,
            steps: 3,                // default 1, try 3 if path defined
            extrudePath: null       // or path
        };
        geometry = new THREE.ExtrudeGeometry(shape, options);
        return geometry;
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSelectChanged(value) {
        this.setState({
            selectValue: value.value
        });
    }

    onCalculate(event) {
        let errors = {};
        event.preventDefault();
        const userData = {
            planter_name: this.state.planter_name,
            chosenMaterial: this.state.selectValue,
            radius: this.state.radius,
            height: this.state.height
        }
        console.log(userData.chosenMaterial);
        console.log(this.state.materialArray);
        this.state.materialArray.forEach(element => {
            if (element.material_name === this.state.selectValue) {
                const matchMaterial = element
                console.log(matchMaterial);
                let materialDensity = matchMaterial.density;
                let materialCost = matchMaterial.cost;
                let volume = ((userData.radius * userData.radius * Math.PI)/2) * userData.height;
                let reqTonne = volume * materialDensity;
                let reqCost = reqTonne * materialCost;
                this.setState({
                    volume: volume.toFixed(2),
                    reqTonne: reqTonne.toFixed(2),
                    reqCost: reqCost.toFixed(2)
                })
            }
        })
    }

    onSubmit(event) {
        let errors = {};
        event.preventDefault();
        const projectData = {
            planter_name: this.state.planter_name,
            chosenMaterial: this.state.selectValue,
            volume: this.state.volume,
            reqTonne: this.state.reqTonne,
            reqCost: this.state.reqCost
        }
        console.log(projectData);
        addProject(projectData).then(res => {
            this.props.history.push('/projects')
        })
        console.log("Project submitted");
    }

    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 768px)").addListener(handler);
        getMaterials()
            .then(data => {
                const materialArray = data;
                this.setState({ materialArray });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { materialArray } = this.state;
        var options = materialArray && materialArray.map(element => {
            return {
                value: element.material_name,
                label: element.material_name
            }
        })

        if (!localStorage.usertoken) {
            return (<p>Not Authorized</p>)
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h2>Semi-Circular Planter Box</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={{ span: 8, offset: 2 }}>
                            {this.state.matches && (<ThreeD geometry={this.semiCircle} cameraPos={85} />)}
                            {!this.state.matches && (<ThreeD geometry={this.semiCircle} cameraPos={130} />)}
                            {/* <ThreeD geometry={this.semiCircle} /> */}
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            {options && <Select
                                name="form-field-name"
                                value={this.state.selectValue}
                                options={options}
                                placeholder="Select a Material"
                                searchable={false}
                                onChange={this.onSelectChanged}
                            />}
                        </Col>
                    </Row>
                    <Row>
                        <div className='col-md-6 mt-5'>
                            <form noValidate onSubmit={this.onCalculate}>
                                <h1 className='h3 mb-3 font-weight normal'>Dimension Input</h1>
                                <div className='form-group'>
                                    <label htmlFor='planter_name'>Planter Name</label>
                                    <input type='text'
                                        refs='planter_name'
                                        className='form-control'
                                        name='planter_name'
                                        placeholder='Enter Planter Name'
                                        value={this.state.planter_name}
                                        onChange={this.onChange}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["planter_name"]}</span>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='radius'>Radius in meters</label>
                                    <input type='number'
                                        refs='radius'
                                        className='form-control'
                                        name='radius'
                                        placeholder='Enter Radius'
                                        value={this.state.radius}
                                        onChange={this.onChange}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["radius"]}</span>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='Height'>Height in meters</label>
                                    <input type='number'
                                        refs='height'
                                        className='form-control'
                                        name='height'
                                        placeholder='Enter Height'
                                        value={this.state.height}
                                        onChange={this.onChange}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["height"]}</span>
                                </div>

                                <button type='submit' className='btn btn-lg btn-primary btn-block'>
                                    Calculate
                                </button>
                            </form>
                        </div>
                        <div className='col-md-6 mt-5'>
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className='h3 mb-3 font-weight normal'>Calculation</h1>
                                <div className='form-group'>
                                    <label htmlFor='planter_name'>Planter Name</label>
                                    <input type='text'
                                        refs='planter_name'
                                        className='form-control'
                                        name='planter_name'
                                        placeholder=''
                                        value={this.state.planter_name}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='volume'>Volume</label>
                                    <input type='text'
                                        refs='volume'
                                        className='form-control'
                                        name='volume'
                                        placeholder=''
                                        value={this.state.volume}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='chosenMaterial'>Material Chosen</label>
                                    <input type='text'
                                        refs='chosenMaterial'
                                        className='form-control'
                                        name='chosenMaterial'
                                        placeholder=''
                                        value={this.state.selectValue}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='reqTonne'>Required Tonne</label>
                                    <input type='text'
                                        refs='reqTonne'
                                        className='form-control'
                                        name='reqTonne'
                                        placeholder=''
                                        value={this.state.reqTonne}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='reqCost'>Cost</label>
                                    <input type='reqCost'
                                        refs='reqCost'
                                        className='form-control'
                                        name='reqCost'
                                        placeholder=''
                                        value={this.state.reqCost}
                                        readOnly={true}
                                    />
                                </div>
                                <button type='submit' className='btn btn-lg btn-primary btn-block'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </Row>
                    <Row>
                        <Col size="md-3">
                            <Link to="/shapeSelect">← Back to Shapes</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default semiCircleCalc;

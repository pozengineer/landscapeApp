import React, { Component } from "react";
// import "./style.css";
// import GameLoop from './components/three.js';
import * as THREE from "three";
import ThreeD from '../../ThreeD/threeD';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Dropdown, Menu, Trigger } from '@zendeskgarden/react-dropdowns';
import { getMaterials, addProject } from '../../UserFunctions/userFunctions';
// import { Select } from "react-dropdown-select";
import Select from "react-select";
import jwt_decode from 'jwt-decode';
// import { Redirect } from 'react-router-dom';

class SquareCalc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            planter_name: '',
            length: '',
            width: '',
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
            email: '',
            _id: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onCalculate = this.onCalculate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChanged = this.onSelectChanged.bind(this);
    }

    square = element => {
        let geometry;
        geometry = new THREE.BoxGeometry(3, 3, 3);
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
            length: this.state.length,
            width: this.state.width,
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
                let volume = userData.length * userData.width * userData.height;
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
        const token = localStorage.usertoken;
        if(!token) {return};
        const decoded = jwt_decode(token);
        this.setState({
            _id: decoded._id
        });
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
        console.log(this.state._id);
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h2>Dimensions of Planter Box</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={{ span: 8, offset: 2 }}>
                            <ThreeD geometry={this.square} />
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
                                <h1 className='h3 mb-3 font-weight normal'>Parameter Input</h1>
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
                                    <label htmlFor='length'>Length in meters</label>
                                    <input type='number'
                                        refs='length'
                                        className='form-control'
                                        name='length'
                                        placeholder='Enter Length'
                                        value={this.state.length}
                                        onChange={this.onChange}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["length"]}</span>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='width'>Width in meters</label>
                                    <input type='number'
                                        refs='width'
                                        className='form-control'
                                        name='width'
                                        placeholder='Enter Width'
                                        value={this.state.width}
                                        onChange={this.onChange}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["width"]}</span>
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

export default SquareCalc;

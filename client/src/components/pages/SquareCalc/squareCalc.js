import React, { Component, useState } from "react";
// import "./style.css";
// import GameLoop from './components/three.js';
import * as THREE from "three";
import ThreeD from '../../ThreeD/threeD';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { getUsers } from '../../UserFunctions/userFunctions';
// import { Select } from "react-dropdown-select";
import Select from "react-select";

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
            userArray: [],
            selectValue: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onCalculate = this.onCalculate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChanged = this.onSelectChanged.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    square = element => {
        let geometry;
        geometry = new THREE.BoxGeometry(3, 3, 3);
        return geometry;
    }

    handleInputChange = value => {
        console.log(`Selected: ${value}`);
        this.setState({
            selectValue: value
        });
        console.log('Selected: ' + this.state.material);
        if (value === 'pebble') {
            console.log('heavy hitter!');
        }
        else if (value === 'gardenMix') {
            console.log('planting!');
        }
        else {
            console.log('cement mixing!');
        }
    }

    handleChange(event) {
        this.setState({ selectValue: event.target.value });
        console.log(this.state.selectValue);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSelectChanged(value) {
        this.setState({
            selectValue: value
        });
        console.log(this.state.brandSelect);
    }

    onCalculate(event) {
        let errors = {};
        event.preventDefault();
        const userData = {
            planter_name: this.state.planter_name,
            length: this.state.length,
            width: this.state.width,
            height: this.state.height
        }
        console.log(userData);
    }

    onSubmit(event) {
        let errors = {};
        event.preventDefault();
        const userData = {
            planter_name: this.state.planter_name,
            length: this.state.length,
            width: this.state.width,
            height: this.state.height
        }
        console.log(userData);
    }

    componentDidMount() {
        getUsers()
            .then(data => {
                const userArray = data;
                this.setState({ userArray });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { userArray } = this.state;

        let userList = userArray.length > 0
            && userArray.sort().map((item, i) => {
                return (
                    <option key={i} name="brandSelect" value={item.email}>{item.email}</option>
                )
            }, this);

        var options = [{
            value: 'Volkswagen',
            label: 'Volkswagen'
        }, {
            value: 'Seat',
            label: 'Seat'
        }];

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
                        <Col sm={12} md={12}>
                            <ThemeProvider>
                                <Dropdown onSelect={this.handleInputChange}>
                                    <Trigger>
                                        <button>Select Material</button>
                                    </Trigger>
                                    <Menu placement="end" arrow>
                                        {userList}
                                    </Menu>
                                </Dropdown>
                            </ThemeProvider>
                        </Col>
                        <Col md={4}>
                            <Select
                                name="form-field-name"
                                value={this.state.brandSelect}
                                options={options}
                                placeholder="Select a brand"
                                searchable={false}
                                onChange={this.onSelectChanged.bind(this)}
                            />
                        </Col>
                        <Col md={12}>
                            <div>
                                <select
                                    value={this.state.selectValue}
                                    onChange={this.handleChange}
                                >
                                    {userList}
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className='col-md-6 mt-5'>
                            <form noValidate onSubmit={this.onCalculate}>
                                <h1 className='h3 mb-3 font-weight normal'>Parameter Input</h1>
                                <div className='form-group'>
                                    <label htmlFor='planter_name'>Plantar Name</label>
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
                                <div className='form-group'>
                                    <label htmlFor='chosenMaterial'>Material Chosen</label>
                                    <input type='text'
                                        refs='chosenMaterial'
                                        className='form-control'
                                        name='chosenMaterial'
                                        placeholder=''
                                        value={this.state.chosenMaterial}
                                        readOnly={true}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["height"]}</span>
                                </div>
                                <button type='submit' className='btn btn-lg btn-primary btn-block'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SquareCalc;

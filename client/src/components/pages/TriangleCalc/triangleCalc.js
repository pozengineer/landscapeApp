import React, { Component } from "react";
// import "./style.css";
import * as THREE from "three";
import ThreeD from '../../ThreeD/threeD';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { getMaterials, addProject } from '../../UserFunctions/userFunctions';
import Select from "react-select";

class TriangleCalc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            planter_name: '',
            baseLength: '',
            perpendicularHeight: '',
            height: '',
            errors: {},
            geometry: '',
            materialArray: [],
            selectValue: '',
            material: [],
            volume: '',
            chosenMaterial: '',
            reqTonne: '',
            reqCost: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onCalculate = this.onCalculate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectChanged = this.onSelectChanged.bind(this);
    }

    triangle = element => {
        let geometry;
        let length = 5;
        let width = 3;

            var triShape = new THREE.Shape();
            triShape.moveTo(0, 0);
            triShape.lineTo(length / 2, width);
            triShape.lineTo(length, 0);
            // triShape.lineTo(length, 0);
            triShape.lineTo(0, 0);

        let extrudeSettings = {
            steps: 2,
            depth: 4,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        geometry = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
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
            baseLength: this.state.baseLength,
            perpendicularHeight: this.state.perpendicularHeight,
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
                let volume = ((userData.baseLength)/2 * userData.perpendicularHeight) * userData.height;
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
                            <h2>Dimensions of Planter Box</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={{ span: 8, offset: 2 }}>
                            <ThreeD geometry={this.triangle} />
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

export default TriangleCalc;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

function Detail(props) {
    const [project, setProject] = useState({})

    // When this component mounts, grab the book with the _id of props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    const { id } = useParams()
    useEffect(() => {
        API.getProject(id)
            .then(res => setProject(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <h1>
                            {project.planter_name}
                        </h1>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col size="md-10 offset-md-1">
                    <article>
                        <h5>Chosen Material</h5>
                        <p>
                            {project.chosenMaterial}
                        </p>
                    </article>
                </Col>
                <Col size="md-10 offset-md-1">
                    <div>
                        <h5>Required Tonne</h5>
                        <p>
                            {project.reqTonne} Tonne
                        </p>
                    </div>
                </Col>
                <Col size="md-10 offset-md-1">
                    <div>
                        <h5>Required Cost</h5>
                        <p>
                            <i className="fas fa-dollar-sign"></i> {project.reqCost}
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col size="md-3">
                    <Link to="/projects">← Back to Projects</Link>
                </Col>
            </Row>
        </Container>
    );
}


export default Detail;

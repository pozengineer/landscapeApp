import React, { useState, useEffect } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link } from "react-router-dom";
import { getProjects } from '../UserFunctions/userFunctions';
import { ProjectCard } from './project';

function Projects() {
    // Setting our component's initial state
    const [projects, setProjects] = useState([])

    // Load all books and store them with setBooks
    useEffect(() => {
        loadProjects()
    }, [])

    // Loads all books and sets them to books
    function loadProjects() {
        getProjects()
            .then(res => {
                setProjects(res);
                console.log(JSON.stringify(res));
            })
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteProject(id) {
        API.deleteProject(id)
            .then(res => loadProjects())
            .catch(err => console.log(err));
    }

    if (!localStorage.usertoken) {
        return (<p>Not Authorized</p>)
    }
    return (
        <Container fluid>
            <Jumbotron>
                <h1>Projects On My List</h1>
            </Jumbotron>
            <Row>
                {projects && projects.length &&
                    projects.map(project => {
                        return (
                            <ProjectCard key={project._id} project={project} deleteProject={deleteProject} />
                        );
                    })
                }
                {projects && !projects.length && <h5>No Results to Display</h5>}
            </Row>
            <Row>
                <Col size="md-3">
                    <Link to="/shapeSelect">← Back to Shapes</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Projects;

import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import { getProjects } from '../UserFunctions/userFunctions';

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

    return (
        <Container fluid>
            <Jumbotron>
                <h1>Projects On My List</h1>
            </Jumbotron>
            <Row>
                <Col size="md-4 sm-12">
                    {projects && projects.length ? (
                        <div>
                            {projects.map(project => {
                                return (
                                    <ListItem key={project._id}>
                                        <a href={"/projects/" + project._id}>
                                            <strong>
                                                {project.planter_name}
                                            </strong>
                                        </a>
                                        <DeleteBtn onClick={() => deleteProject(project._id)} />
                                    </ListItem>
                                );
                            })}
                        </div>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
                </Col>
            </Row>
        </Container>
    );
}

export default Projects;

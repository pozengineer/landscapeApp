import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteBtn from "../../components/DeleteBtn";
import { Col } from "../../components/Grid";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export const ProjectCard = (props) => {
    if (!localStorage.usertoken) {
        return (<p>Not Authorized</p>)
    }
    return (
        <Col size="md-4">
            <Card>
                <Link to={"/projects/" + props.project._id} className='nav-link'>
                    <strong>
                        {props.project.planter_name}
                    </strong>
                </Link>
                <DeleteBtn onClick={() => props.deleteProject(props.project._id)} />
            </Card>
        </Col>
    );
}

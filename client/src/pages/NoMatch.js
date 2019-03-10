import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";

function NoMatch() {
    return (
        <Container fluid>
            <Row>
                <Col size={"md-12"}>
                    <Jumbotron>
                        <h1>404 Error Page Not Found</h1>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default NoMatch;
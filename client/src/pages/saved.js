import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";

class Saved extends Component {
    state = {
        books: [],
    };

    componentDidMount() {
        API.getBooks()
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));
    }

    deleteBtn = event => {
        API.deleteBook(event.target.id)
            .then(res => console.log("deleted"))
            .catch(err => console.log(err));
    };

    componentDidUpdate() {
        API.getBooks()
        .then(res => this.setState({ books: res.data }))
        .catch(err => console.log(err));
    }



    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size={"md-12"}>
                        <Jumbotron>
                            <h1 className="display-4">(React) Google Books Search</h1>
                            <p className="lead">Search for and Save Books of Interest</p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size={"md-12"}>
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <FormBtn onClick={this.deleteBtn} id={book._id}>Delete</FormBtn>
                                        <a href={book.link} target={"_blank"}><FormBtn onClick={this.viewBtn}>View</FormBtn></a>
                                        <h1>{book.title}</h1>
                                        <h6>{book.author}</h6>
                                        <h6>{book.synopsis}</h6>
                                        <img src={book.thumbnail} alt={book.thumbnail}></img>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3 style={{ textAlign: "center" }}>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Saved;
import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import { Card, CardHeader, CardBody } from "../components/Card";

class Search extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: "",
        thumbnail: "",
        link: ""
    };

    handleFormSubmit = event => {
        event.preventDefault()
        API.findBooks(this.state.title).then(res => {
            this.setState({ books: res.data.items, title: "" })
            console.log(this.state.books)
        });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    saveBtn = event => {
        console.log(this.state.books);

        for (let i = 0; i < this.state.books.length; i++) {
            if (this.state.books[i].id === event.target.id) {
                API.saveBook({
                    title: this.state.books[i].volumeInfo.title,
                    author: this.state.books[i].volumeInfo.authors[0],
                    synopsis: this.state.books[i].searchInfo.textSnippet,
                    thumbnail: this.state.books[i].volumeInfo.imageLinks.thumbnail,
                    link: this.state.books[i].volumeInfo.infoLink
                })
                    .then(res => console.log("success"))
                    .catch(err => console.log(err));
            }
        }
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
                    <Card>
                        <CardHeader>
                            <h4>Search</h4>
                        </CardHeader>
                        <CardBody>
                            <h6>Books</h6>
                            <br></br>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            >
                            </Input>
                            <FormBtn
                                onClick={this.handleFormSubmit}>
                                Search
                                </FormBtn>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col size={"md-12"}>
                    {this.state.books.length ? (
                        <List>
                            {this.state.books.map(book => (
                                <ListItem key={book.id}>
                                    <FormBtn onClick={this.saveBtn} id={book.id}>Save</FormBtn>
                                    <a href={book.volumeInfo.infoLink} target={"_blank"}><FormBtn onClick={this.viewBtn}>View</FormBtn></a>
                                    <h1>{book.volumeInfo.title}</h1>
                                    <h6>{book.volumeInfo.authors}</h6>
                                    <h6>{book.searchInfo.textSnippet}</h6>
                                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.imageLinks.thumbnail}></img>
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

export default Search;



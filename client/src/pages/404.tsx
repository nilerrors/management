import { Component } from "solid-js";
import { Container } from "solid-bootstrap";
import { A } from "@solidjs/router";

const NotFound: Component = () => {
    return (
        <Container class="bg-dark text-center align-middle">
            <h1>404 Page Not Found</h1>
            <A href="/">Go To Home</A>
        </Container>
    );
};

export default NotFound;

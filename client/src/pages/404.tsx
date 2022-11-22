import { Component } from "solid-js";
import { Container } from "solid-bootstrap";
import { A } from "@solidjs/router";

const NotFound: Component = ({
  message,
  goto,
}: {
  message?: string;
  goto?: {
    link: string;
    message: string;
  };
}) => {
  document.title = message ?? "";

  return (
    <Container class='bg-dark text-center align-middle'>
      <h1>{message ?? "404 Page Not Found"}</h1>
      <A href={goto?.link ?? "/"}>{goto?.message ?? "Go To Home"}</A>
    </Container>
  );
};

export default NotFound;

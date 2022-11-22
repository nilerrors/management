import { Component } from "solid-js";
import { Container } from "solid-bootstrap";

const Settings: Component = () => {
  document.title = "Settings";

  return (
    <Container class='bg-dark text-align-center'>
      <h1>Settings</h1>
    </Container>
  );
};

export default Settings;

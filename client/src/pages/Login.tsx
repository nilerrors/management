import { Form, Col, Row, Button, Container, Card } from "solid-bootstrap";
import { Component, createEffect, createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { useForm } from "../hooks/useForm";

const Login: Component = () => {
  const navigate = useNavigate();
  const { logIn, isLoggedIn } = useAuthentication();

  const [error, setError] = createSignal<string | null>(null);

  // if (isLoggedIn("Login")) {
  //   navigate("/");
  //   return;
  // }

  document.title = "Login";
  document.body.style.background =
    "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))";

  const { form, updateFormField } = useForm({
    email: "",
    password: "",
    stayLoggedIn: true,
  });

  const formSubmit = (event: Event) => {
    event.preventDefault();

    const [loggedIn, errorMessage] = logIn(
      form.email,
      form.password,
      form.stayLoggedIn
    );

    if (loggedIn()) {
      navigate("/", { replace: true });
      return;
    }

    setError(errorMessage());
  };

  return (
    <Container fluid class='user-select-none'>
      <Form onSubmit={formSubmit}>
        <Form.Text class='text-white-50'>{error()}</Form.Text>
        <Row class='d-flex justify-content-center align-items-center h-100'>
          <Col col='12'>
            <Card
              class='bg-dark text-white my-5 mx-auto'
              style={{ "border-radius": "1rem", "max-width": "400px" }}
            >
              <Card.Body class='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <Form.Group class='mb-4 mx-5 w-100'>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    class='bg-dark text-white'
                    size='lg'
                    required={true}
                    onChange={updateFormField("email")}
                  />
                </Form.Group>
                <Form.Group class='mb-4 mx-5 w-100'>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    class='bg-dark text-white'
                    size='lg'
                    required={true}
                    onChange={updateFormField("password")}
                  />
                </Form.Group>
                <Form.Text class='small mb-3 pb-lg-2'>
                  <A href='/forgot-password' class='text-white-50'>
                    Forgot Password?
                  </A>
                </Form.Text>
                <Form.Group class='d-flex flex-row justify-content-center mb-4'>
                  <Form.Check
                    size='lg'
                    label='Remeber me'
                    checked
                    onChange={updateFormField("stayLoggedIn")}
                  />
                </Form.Group>
                <Button
                  type='submit'
                  class='mx-2 px-5'
                  color='white'
                  size='lg'
                  variant='secondary'
                >
                  Sign In
                </Button>
                <hr />
                <Form.Text class='mb-0'>
                  Don't have an account?{" "}
                  <A href='/signup' class='text-white-50 fw-bold'>
                    Sign Up
                  </A>
                </Form.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;

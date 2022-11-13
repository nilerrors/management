import { Component, createSignal, For, Show } from "solid-js";

import { useNavigate, A } from "@solidjs/router";
import {
  Nav,
  Navbar,
  Container,
  Button,
  Offcanvas,
  CloseButton,
} from "solid-bootstrap";
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";

export const NavBar: Component = () => {
  const [show, setShow] = createSignal<boolean>();

  return (
    <Navbar
      bg='primary'
      variant='dark'
      class='user-select-none fixed-top'
      expand='lg'
    >
      <Container>
        <Navbar.Brand>Plants Management</Navbar.Brand>
        <Show
          when={window.innerWidth < 600}
          fallback={<DesktopNavBar urls={urls} />}
        >
          <MobileNavBar urls={urls} />
        </Show>
      </Container>
    </Navbar>
  );
};

const urls = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/esp",
    title: "ESPs",
  },
  {
    url: "/settings",
    title: "Settings",
  },
];

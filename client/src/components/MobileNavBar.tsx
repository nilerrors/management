import { Component, createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import { Nav, Navbar, Offcanvas, CloseButton } from "solid-bootstrap";

type Url = {
  url: string;
  title: string;
};

type MobileNavBarProps = {
  urls: Url[];
};

export const MobileNavBar: Component<MobileNavBarProps> = ({
  urls,
}: MobileNavBarProps) => {
  const [show, setShow] = createSignal<boolean>();

  return (
    <>
      <Navbar.Toggle onClick={() => setShow(true)} />
      <Navbar.Offcanvas placement='end' show={show()}>
        <Offcanvas.Header>
          <Offcanvas.Title>Plants Management</Offcanvas.Title>
          <CloseButton onClick={() => setShow(false)}></CloseButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav class='justify-content-end flex-grow-1 pe-3'>
            <For each={urls}>
              {(url) => (
                <Nav.Item>
                  <A
                    href={url.url}
                    class='text-white mx-2 text-underline-hover'
                    onClick={() => setShow(false)}
                  >
                    {url.title}
                  </A>
                </Nav.Item>
              )}
            </For>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
};

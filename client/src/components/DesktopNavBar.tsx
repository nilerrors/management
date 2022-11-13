import { Component, createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import { Nav, Navbar } from "solid-bootstrap";

type Url = {
  url: string;
  title: string;
};

type DesktopNavBarProps = {
  urls: Url[];
};

export const DesktopNavBar: Component<DesktopNavBarProps> = ({
  urls,
}: DesktopNavBarProps) => {
  const [show, setShow] = createSignal<boolean>();

  return (
    <>
      <Navbar.Toggle
        aria-controls='desktopNavbar'
        onClick={() => setShow(true)}
      />
      <Navbar.Collapse id='desktopNavbar' appear={show()}>
        <Nav class='overflow-hidden overflow-hidden'>
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
      </Navbar.Collapse>
    </>
  );
};

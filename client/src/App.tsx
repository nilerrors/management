import { Component, createEffect } from "solid-js";

import { lazy } from "solid-js";
import { Routes, Route, useNavigate } from "@solidjs/router";
import { Container } from "solid-bootstrap";

import { NavBar } from "./components/NavBar";
import { useAuthentication } from "./contexts/AuthenticationContext";

const Home = lazy(() => import("./pages/Home"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/404"));

const App: Component = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthentication();

  // if (!isLoggedIn("App")) {
  //   navigate("/login");
  // }

  return (
    <>
      <NavBar />
      <main class='bg-dark text-white position-absolute p-0 m-0'>
        <Routes>
          <Route path='/' component={Home} />
          <Route path='/settings' component={Settings} />
          <Route path='*' component={NotFound} />
        </Routes>
      </main>
    </>
  );
};

export default App;

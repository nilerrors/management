import type { Component } from "solid-js";

import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { Container } from "solid-bootstrap";

import { NavBar } from "./components/NavBar";

const Home = lazy(() => import("./pages/Home"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/404"));

const App: Component = () => {
    return (
        <>
            <NavBar />
            <main class="bg-dark text-white position-absolute p-0 m-0">
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/settings" component={Settings} />
                    <Route path="*" component={NotFound} />
                </Routes>
            </main>
        </>
    );
};

export default App;

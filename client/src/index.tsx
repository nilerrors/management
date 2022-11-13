/* @refresh reload */
import { render, Suspense } from "solid-js/web";
import { Router } from "@solidjs/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";

import App from "./App";

render(
    () => (
        <Suspense fallback="Loading...">
            <Router>
                <App />
            </Router>
        </Suspense>
    ),
    document.getElementById("root") as HTMLElement
);

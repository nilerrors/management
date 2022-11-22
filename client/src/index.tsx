/* @refresh reload */
import { render, Suspense, Show } from "solid-js/web";
import { lazy } from "solid-js";
import { Router, Routes, Route, Navigate } from "@solidjs/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";

import {
  AuthenticationContextProvider,
  useAuthentication,
} from "./contexts/AuthenticationContext";

const App = lazy(() => import("./App"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

render(
  () => (
    <Suspense fallback='Loading...'>
      <Router>
        <AuthenticationContextProvider>
          <Routes>
            <Show
              when={!useAuthentication().isLoggedIn("Index")}
              fallback={
                <>
                  <Route path='*' component={App} />
                  <Route path='/login' element={<Navigate href='/' />} />
                  <Route path='/signup' element={<Navigate href='/' />} />
                  <Route
                    path='/forgot-password'
                    element={<Navigate href='/' />}
                  />
                </>
              }
            >
              <Route path='*' element={<Navigate href='/login' />} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Show>
          </Routes>
        </AuthenticationContextProvider>
      </Router>
    </Suspense>
  ),
  document.getElementById("root") as HTMLElement
);

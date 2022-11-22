import { useNavigate } from "@solidjs/router";
import {
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
  Accessor,
} from "solid-js";
import { createStoredSignal } from "../hooks/createStoredSignal";
import { get, post } from "../services/makeRequest";

type AuthenticationContextProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

type Authentication = {
  token: Accessor<string | null>;
  logIn: (
    username: string,
    password: string,
    stayLoggedIn: boolean
  ) => [Accessor<boolean>, Accessor<string | null>];
  isLoggedIn: (msg: string) => boolean;
};

export const AuthenticationContext = createContext<Authentication>();

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error("Authentication Context used outside of provider");
  }

  return context;
}

export const AuthenticationContextProvider: Component<
  AuthenticationContextProviderProps
> = (props: AuthenticationContextProviderProps) => {
  const [token, setAndStoreToken] = createStoredSignal<string | null>(
    "managementAuthToken",
    null
  );

  const logIn = (
    email: string,
    password: string,
    stayLoggedIn: boolean = true
  ): [Accessor<boolean>, Accessor<string | null>] => {
    let [loggedIn, setLoggedIn] = createSignal(true);
    let [errorMessage, setErrorMessage] = createSignal<string | null>(null);
    post("/auth/login", {
      email,
      password,
      duration: stayLoggedIn ? undefined : 86400,
    })
      .then((res) => {
        setAndStoreToken(res?.access_token);
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoggedIn(false);
      });

    return [loggedIn, errorMessage];
  };

  const isLoggedIn = (msg: string): boolean => {
    console.log(msg);

    let loggedIn = true;
    if (token() == null || token() == "") return false;
    get("/auth/user", undefined, token() ?? undefined)
      .then((res) => {
        loggedIn = res?.current_user != undefined;
      })
      .catch((error) => {
        loggedIn = false;
        console.log(error);
      });
    return loggedIn;
  };

  const signUp = (
    email: string,
    password: string,
    stayLoggedIn: boolean = true
  ) => {
    let success = true;
    let errorMessage: string | null = null;
    post("/auth/signup", {
      email,
      password,
      duration: stayLoggedIn ? false : 86400,
    })
      .then((res) => setAndStoreToken(res?.access_token))
      .catch((error) => {
        errorMessage = error;
        success = false;
      });

    return [success, errorMessage];
  };

  const user = {
    token,
    logIn,
    isLoggedIn,
  };

  return (
    <AuthenticationContext.Provider value={user}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

import React, { lazy, ReactNode, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./firebase";
import { Grid } from "react-loader-spinner";
import { ThemeConsumer, ThemeProvider } from "./themeContext";

import styles from "./App.module.scss";

import { store } from "./store";
import SwitchButton from "./components/switchButton/switchButton";
import { themeLight } from "./themeContext/constants";
import { useAuth } from "./hooks/useAuth";

const Header = lazy(() => import("./components/header/header"));
const Detail = lazy(() => import("./pages/detail/detail"));
const Main = lazy(() => import("./pages/main/main"));
const Register = lazy(() => import("./pages/register/register"));
const Login = lazy(() => import("./pages/login/login"));
const History = lazy(() => import("./pages/history/history"));
const Favorite = lazy(() => import("./pages/favorite/favorite"));
const ErrorBoundary = lazy(
  () => import("./components/errorBoundary/errorBoundary")
);

interface RequireAuthInterface {
  children: ReactNode;
  redirectTo: string;
}

function RequireAuth({ children, redirectTo }: RequireAuthInterface) {
  const { isAuth } = useAuth();

  return isAuth ? <>{children}</> : <Navigate to={redirectTo} />;
}

export function componentWithContext(component: ReactNode) {
  const renderMyComponent = (theme: Record<string, string | (() => void)>) => {
    return (
      <div
        style={{
          backgroundColor: `${theme.themeColor as string}`,
        }}
        className={styles.app_container}
      >
        {component}
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className={styles.fallback_container}>
                <Grid
                  height="80"
                  width="80"
                  color="#b50938"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            }
          >
            <BrowserRouter>
              <Header
                themeButton={
                  <SwitchButton
                    callbackToggle={theme.toggleTheme as () => void}
                  />
                }
              />

              <div className={styles.main__container}>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/:artworkId" element={<Detail />} />
                  <Route path="/signup" element={<Register />} />
                  <Route path="/signin" element={<Login />} />
                  <Route
                    path="/history"
                    element={
                      <RequireAuth redirectTo="/">
                        <History />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <RequireAuth redirectTo="/">
                        <Favorite />
                      </RequireAuth>
                    }
                  />
                  <Route></Route>
                </Routes>
              </div>
            </BrowserRouter>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  };

  return (
    <ThemeConsumer>
      {(theme: { themeColor: string; toggleTheme: () => void }) =>
        renderMyComponent(theme)
      }
    </ThemeConsumer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ themeColor: themeLight }}>
        {componentWithContext(<></>)}
      </ThemeProvider>
    </Provider>
  );
}

export default App;

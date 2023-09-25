import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import Header from "./components/header/header";
import Detail from "./pages/detail/detail";

import Main from "./pages/main/main";
import Register from "./pages/register/register";
import { store } from "./store";
import "./firebase";
import Login from "./pages/login/login";
import History from "./pages/history/history";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className={styles.main__container}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:artworkId" element={<Detail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

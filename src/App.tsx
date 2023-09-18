import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import Header from "./components/header/header";
import Detail from "./pages/detail/detail";

import Main from "./pages/main/main";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className={styles.main__container}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:artworkId" element={<Detail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/GlobalStyle";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import MoviePage from "./components/MoviePage";
import SessionPage from "./components/SessionPage";
import SuccessPage from "./components/SuccessPage";

export default function App() {
  const [orderInfo, setOrderInfo] = useState({});

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:MOVIE_ID" element={<MoviePage />} />
        <Route
          path="/session/:SESSION_ID"
          element={
            <SessionPage setOrderInfo={setOrderInfo} />
          }
        />
        <Route
          path="/success"
          element={
            <SuccessPage orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
          }
        />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../assets/GlobalStyle";
import Header from "./Header";
import MainPage from "./MainPage";
import MoviePage from "./MoviePage";
import SessionPage from "./SessionPage";
import SuccessPage from "./SuccessPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

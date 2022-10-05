import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";

export default function MoviePage() {
  const [movie, setMovie] = useState({});
  const ID_DO_FILME = 1;
  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${ID_DO_FILME}/showtimes`;
    axios
      .get(URL)
      .then((r) => {
        console.log(r.data);
        setMovie(r.data);
      })
      .catch((e) => console.log(e.response.data));
  }, []);
  console.log(movie.days);
  function days(d) {
    return (
      <div key={d.id}>
        <p>{[d.weekday, " - ", d.date].join("")}</p>
        {d.showtimes.map((st) => (
          <button key={st.id}>{st.name}</button>
        ))}
      </div>
    );
  }
  return (
    <MoviePageStyled>
      <span>Selecione o horário</span>
      <div>{movie.days.map((d) => days(d))}</div>
      <Footer movieTitle={movie.title} movieURL={movie.posterURL} />
    </MoviePageStyled>
  );
}

const MoviePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 67px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 110px;
    font-family: "Roboto";
    font-weight: 400;
    font-size: 24px;
    color: #293845;
  }
  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 11px;
    column-gap: 25px;
  }
  img {
    height: 193px;
    padding: 8px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
`;

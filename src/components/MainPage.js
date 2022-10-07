import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function MainPage() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";
    axios
      .get(URL)
      .then((res) => setMoviesList(res.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  function Poster({ movie }) {
    return (
      <Link key={movie.id} to={`/movie/${movie.id}`}>
        <img
          key={movie.id}
          src={movie.posterURL}
          alt={movie.title}
          data-identifier="movie-outdoor"
        />
      </Link>
    );
  }

  return (
    <MainPageStyled>
      <span>Selecione o filme</span>
      <div>
        {moviesList.map((movie) => (
          <Poster key={movie.id} movie={movie} />
        ))}
      </div>
    </MainPageStyled>
  );
}

const MainPageStyled = styled.div`
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
    background: #ffffff;
    &:hover {
      filter: brightness(0.85);
      cursor: pointer;
    }
  }
`;

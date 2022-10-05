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
      .then((r) => {
        console.log(r.data);
        setMoviesList(r.data);
      })
      .catch((e) => console.log(e.response.data));
  }, []);
  return (
    <MainPageStyled>
      <span>Selecione o filme</span>
      <div>
        {moviesList.map((m) => (
          <Link key={m.id} to={`/movie/${m.id}`}>
            <img key={m.id} src={m.posterURL} alt={m.title} />
          </Link>
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
  }
`;

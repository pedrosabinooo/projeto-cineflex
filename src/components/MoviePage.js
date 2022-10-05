import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

export default function MoviePage() {
  const [movie, setMovie] = useState({});
  const [days, setDays] = useState([]);
  const { MOVIE_ID } = useParams();

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${MOVIE_ID}/showtimes`;
    axios
      .get(URL)
      .then((r) => {
        setMovie({ title: r.data.title, posterURL: r.data.posterURL });
        setDays(r.data.days);
      })
      .catch((e) => console.log(e.response.data));
  }, []);

  console.log(movie);

  return (
    <>
      <MoviePageStyled>
        <span>Selecione o horário</span>
        <DaysListStyled>
          {days.map((d) => (
            <DayStyled key={d.id}>
              <p>{[d.weekday, " - ", d.date].join("")}</p>
              <div>
                {d.showtimes.map((st) => (
                  <Link to={`/session/${st.id}`} key={st.id}>
                    <ShowtimeButtomStyled key={st.id}>
                      {st.name}
                    </ShowtimeButtomStyled>
                  </Link>
                ))}
              </div>
            </DayStyled>
          ))}
        </DaysListStyled>
      </MoviePageStyled>
      <Footer
        movieTitle={movie.title}
        movieURL={movie.posterURL}
        weekday={""}
        showtime={""}
      />
    </>
  );
}

const MoviePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 67px;
  padding-bottom: 140px;
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
`;

const DaysListStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  row-gap: 20px;
`;

const DayStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;
  p {
    font-size: 19px;
  }
`;

const ShowtimeButtomStyled = styled.button`
  width: 70px;
  height: 40px;
  margin-right: 8px;
  background: #e8833a;
  border: 0;
  border-radius: 3px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  vertical-align: center;
  text-align: center;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

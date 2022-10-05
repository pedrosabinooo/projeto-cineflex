import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";

export default function SessionPage() {
  const [session, setSession] = useState({});
  const [seats, setSeats] = useState([]);
  const ID_DA_SESSAO = 1;

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${ID_DA_SESSAO}/seats`;
    axios
      .get(URL)
      .then((r) => {
        setSession({
          title: r.data.movie.title,
          posterURL: r.data.movie.posterURL,
          weekday: r.data.day.weekday,
          showtime: r.data.name,
        });
        setSeats(r.data.seats);
      })
      .catch((e) => console.log(e.response.data));
  }, []);

  console.log(session);

  return (
    <>
      <SessionPageStyled>
        <span>Selecione o(s) assento(s)</span>
        <SeatsStyled>
          {seats.map((s) => (
            <SeatStyled key={s.id}>{s.name}</SeatStyled>
          ))}
        </SeatsStyled>
        <div>Legenda</div>
        <div>Formulário</div>
        <ScheduleButtomStyled>Reservar assento(s)</ScheduleButtomStyled>
      </SessionPageStyled>
      <Footer
        movieTitle={session.title}
        movieURL={session.posterURL}
        weekday={session.weekday}
        showtime={session.showtime}
      />
    </>
  );
}

const SessionPageStyled = styled.div`
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

const SeatsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 331.5px;
  row-gap: 20px;
  column-gap: 7px;
  margin-top: -20px;
`;

const SeatStyled = styled.button`
  display: flex;
  width: 26px;
  height: 26px;
  background: #c3cfd9;
  border: 1px solid #808f9d;
  border-radius: 12px;
  font-size: 11px;
  align-items: center;
  justify-content: center;
`;

const ScheduleButtomStyled = styled.button`
  width: 225px;
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
  margin-top: 30px;
`;

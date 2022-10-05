import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

export default function SessionPage() {
  const [session, setSession] = useState({});
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { SESSION_ID } = useParams();

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${SESSION_ID}/seats`;
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

  function bookSeat(bookingInfo) {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`;
    axios
      .post(URL, bookingInfo)
      .then((r) => {
        console.log(bookingInfo);
        console.log(r.data);
      })
      .catch((e) => console.log(e.response.data));
  }

  console.log(seats);
  console.log(selectedSeats);

  function chooseSeat(s) {
    if (s.isAvailable) {
      if (selectedSeats.includes(s.name)) {
        setSelectedSeats(
          selectedSeats.filter((selected) => selected !== s.name)
        );
      } else {
        setSelectedSeats([...selectedSeats, s.name]);
      }
    }
  }

  return (
    <>
      <SessionPageStyled>
        <span>Selecione o(s) assento(s)</span>
        <SeatsStyled>
          {seats.map((s) => (
            <SeatStyled
              key={s.id}
              isAvailable={s.isAvailable}
              isSelected={selectedSeats.includes(s.name)}
              onClick={() => chooseSeat(s)}
            >
              {s.name}
            </SeatStyled>
          ))}
        </SeatsStyled>
        <SeatLegendStyled>
          <div>
            <SeatStyled
              isAvailable={true}
              isSelected={true}
              className="legend"
            />
            <p>Selecionado</p>
          </div>
          <div>
            <SeatStyled
              isAvailable={true}
              isSelected={false}
              className="legend"
            />
            <p>Disponível</p>
          </div>
          <div>
            <SeatStyled
              isAvailable={false}
              isSelected={false}
              className="legend"
            />
            <p>Indiponível</p>
          </div>
        </SeatLegendStyled>
        <SessionPageFormStyled id="SessionPageForm">
          <p>Nome do comprador:</p>
          <input placeholder="Digite seu nome..." required></input>
          <p>CPF do comprador:</p>
          <input placeholder="Digite seu CPF..." required></input>
        </SessionPageFormStyled>
        <Link to="/success">
          <BookButtomStyled
            onClick={() =>
              bookSeat({
                ids: selectedSeats,
                name: "Fulano",
                cpf: "12312312312",
              })
            }
          >
            Reservar assento(s)
          </BookButtomStyled>
        </Link>
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
  background: ${(props) =>
    props.isSelected ? "#1AAE9E" : props.isAvailable ? "#c3cfd9" : "#FBE192"};
  border: 1px solid
    ${(props) =>
      props.isSelected ? "#0E7D71" : props.isAvailable ? "#808f9d" : "#F7C52B"};
  border-radius: 12px;
  font-size: 11px;
  align-items: center;
  justify-content: center;
`;

const SeatLegendStyled = styled.div`
  display: flex;
  justify-content: space-around;
  width: 280px;
  margin: 25px 0;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .legend {
    width: 24px;
    height: 24px;
  }
  p {
    font-size: 11px;
  }
`;

const SessionPageFormStyled = styled.form`
  width: 331.5px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  input {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    padding-left: 10px;
    &::placeholder {
      font-style: italic;
      color: #afafaf;
    }
  }
`;

const BookButtomStyled = styled.button`
  width: 225px;
  height: 40px;
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

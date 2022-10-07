import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

export default function SessionPage({ setOrderInfo }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sessionInfo, setSessionInfo] = useState({});
  const [buyerInfo, setBuyerInfo] = useState({name:"",cpf:""});
  const { SESSION_ID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${SESSION_ID}/seats`;
    axios
      .get(URL)
      .then((r) => {
        setSessionInfo({
          title: r.data.movie.title,
          posterURL: r.data.movie.posterURL,
          weekday: r.data.day.weekday,
          date: r.data.day.date,
          showtime: r.data.name,
        });
        setSeats(r.data.seats);
      })
      .catch((e) => console.log(e.response.data));
  }, [SESSION_ID]);

  function chooseSeat(s) {
    if (s.isAvailable) {
      if (selectedSeats.includes(s.name)) {
        setSelectedSeats(
          selectedSeats.filter((selected) => selected !== s.name)
        );
      } else {
        setSelectedSeats([...selectedSeats, s.name]);
      }
    } else {
      alert("Esse assento não está disponível");
    }
  }

  function handleForm(e) {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  }

  function bookSeats(e) {
    e.preventDefault();
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`;
    const body = { ...buyerInfo, ids: [...selectedSeats] };
    axios
      .post(URL, body)
      .then((r) => {
        console.log(r.data);
        setOrderInfo({
          sessionInfo: { ...sessionInfo },
          buyerInfo: { ...buyerInfo },
          selectedSeats: [...selectedSeats],
        });
        console.log({
            sessionInfo: { ...sessionInfo },
            buyerInfo: { ...buyerInfo },
            selectedSeats: [...selectedSeats],
          });
        navigate("/success");
      })
      .catch((e) => console.log(e.response.data));
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
              data-identifier="seat"
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
              data-identifier="seat-selected-subtitle"
            />
            <p>Selecionado</p>
          </div>
          <div>
            <SeatStyled
              isAvailable={true}
              isSelected={false}
              className="legend"
              data-identifier="seat-available-subtitle"
            />
            <p>Disponível</p>
          </div>
          <div>
            <SeatStyled
              isAvailable={false}
              isSelected={false}
              className="legend"
              data-identifier="seat-unavailable-subtitle"
            />
            <p>Indiponível</p>
          </div>
        </SeatLegendStyled>
        <SessionPageFormStyled onSubmit={bookSeats}>
          <label htmlFor="name">Nome do comprador:</label>
          <input
            id="name"
            name="name"
            value={buyerInfo.name}
            onChange={handleForm}
            placeholder="Digite seu nome..."
            data-identifier="buyer-name-input"
            required
          ></input>
          <label htmlFor="cpf">CPF do comprador:</label>
          <input
            id="cpf"
            name="cpf"
            value={buyerInfo.cpf}
            onChange={handleForm}
            placeholder="Digite seu CPF..."
            data-identifier="buyer-cpf-input"
            required
          ></input>
          <BookButtomStyled type="submit" data-identifier="reservation-btn">
            Reservar assento(s)
          </BookButtomStyled>
        </SessionPageFormStyled>
      </SessionPageStyled>
      <Footer
        movieTitle={sessionInfo.title}
        movieURL={sessionInfo.posterURL}
        weekday={sessionInfo.weekday}
        showtime={sessionInfo.showtime}
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
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  width: 331.5px;
  row-gap: 20px;
  justify-content: space-between;
  margin-top: -20px;
`;

const SeatStyled = styled.button`
  display: flex;
  width: 26px;
  height: 26px;
  justify-self: center;
  background: ${(props) =>
    props.isSelected ? "#1AAE9E" : props.isAvailable ? "#c3cfd9" : "#FBE192"};
  border: 1px solid
    ${(props) =>
      props.isSelected ? "#0E7D71" : props.isAvailable ? "#808f9d" : "#F7C52B"};
  border-radius: 12px;
  font-size: 11px;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(${(props) => (props.isAvailable ? 0.85 : 1)});
    cursor: ${(props) => (props.isAvailable ? "pointer" : "not-allowed")};
  }
`;

const SeatLegendStyled = styled.div`
  display: flex;
  justify-content: space-around;
  width: 280px;
  margin: 30px 0;
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
  .legend:hover {
    filter: brightness(1);
    cursor: default;
  }
  p {
    font-size: 11px;
  }
`;

const SessionPageFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 331.5px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  input {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 15px;
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
  align-self: center;
  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`;

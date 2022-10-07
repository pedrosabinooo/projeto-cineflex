import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SuccessPage({ orderInfo, setOrderInfo }) {
  function SessionInfo() {
    return (
      <div className="info-container">
        <span className="bold">Filme e sessão</span>
        <span data-identifier="movie-session-infos-reserve-finished">
          {orderInfo.sessionInfo.title}
        </span>
        <span data-identifier="movie-session-infos-reserve-finished">
          {orderInfo.sessionInfo.date + " " + orderInfo.sessionInfo.showtime}
        </span>
      </div>
    );
  }

  function SelectedSeats() {
    return (
      <div className="info-container">
        <span className="bold">Ingressos</span>
        {orderInfo.selectedSeats.map((s) => (
          <span key={s} data-identifier="seat-infos-reserve-finished">
            {"Assento " + s}
          </span>
        ))}
      </div>
    );
  }

  function BuyerInfo() {
    return (
      <div className="info-container">
        <span className="bold">Comprador</span>
        <span data-identifier="buyer-infos-reserve-finished">
          {"Nome: " + orderInfo.buyerInfo.name}
        </span>
        <span data-identifier="buyer-infos-reserve-finished">
          {"CPF: " + orderInfo.buyerInfo.cpf}
        </span>
      </div>
    );
  }

  return (
    <SuccessPageStyled>
      <span className="bold success">Pedido feito com sucesso!</span>

      <SessionInfo />
      <SelectedSeats />
      <BuyerInfo />

      <Link to="/">
        <HomeButtomStyled
          onClick={() => setOrderInfo({})}
          data-identifier="back-to-home-btn"
        >
          Voltar para a Home
        </HomeButtomStyled>
      </Link>
    </SuccessPageStyled>
  );
}

const SuccessPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 67px;
  .info-container {
    width: 85%;
    padding-top: 30px;
  }
  span {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 20px;
    color: #293845;
    line-height: 28px;
  }
  .bold {
    font-weight: 700;
    width: 100%;
    font-size: 24px;
    margin-bottom: 10px;
  }
  .success {
    color: #247a6b;
    text-align: center;
    width: 150px;
    height: 110px;
    margin-bottom: -10px;
  }
`;

const HomeButtomStyled = styled.button`
  width: 225px;
  height: 40px;
  margin-top: 50px;
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
  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`;

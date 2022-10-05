import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SuccessPage() {
  const movieInfo = {
    title: "Enola Holmes",
    date: "13/05/2023",
    session: "15:00",
  };
  const seats = [1, 2, 3];
  const buyerInfo = { name: "José da Silva Sauro", cpf: 90389479212 };
  return (
    <>
      <SuccessPageStyled>
        <span className="bold success">Pedido feito com sucesso!</span>
        <div className="info-container">
          <span className="bold">Filme e sessão</span>
          <span>{movieInfo.title}</span>
          <span>{movieInfo.date + " " + movieInfo.session}</span>
        </div>
        <div className="info-container">
          <span className="bold">Ingressos</span>
          {seats.map((s) => (
            <span key={s}>{"Assento " + s}</span>
          ))}
        </div>
        <div className="info-container">
          <span className="bold">Comprador</span>
          <span>{"Nome: " + buyerInfo.name}</span>
          <span>{"CPF: " + buyerInfo.cpf}</span>
        </div>
        <Link to="/">
          <HomeButtomStyled>Voltar para a Home</HomeButtomStyled>
        </Link>
      </SuccessPageStyled>
    </>
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
`;

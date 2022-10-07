import styled from "styled-components";

export default function Footer({ movieTitle, movieURL, weekday, showtime }) {
  return (
    <FooterStyled>
      <img src={movieURL} alt={movieTitle} data-identifier="movie-img-preview" />
      <MovieInfoStyled data-identifier="movie-and-session-infos-preview">
        <span>{movieTitle}</span>
        <span>{(weekday ? weekday+" - " : "")+(showtime ? showtime : "")}</span>
      </MovieInfoStyled>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 117px;
  left: 0px;
  bottom: 0px;
  background: #dfe6ed;
  border-top: 2px solid #9eadba;
  img {
    height: 81px;
    padding: 8px;
    margin: 0 10px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background: #ffffff;
  }
`;

const MovieInfoStyled = styled.div`
  display: flex;
  flex-direction:column;
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: #293845;
  }
`;

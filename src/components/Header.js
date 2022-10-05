import styled from "styled-components";

export default function Header() {
  return (
      <HeaderStyled>
        <span>CINEFLEX</span>
      </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 67px;
  left: 0px;
  top: 0px;
  background: #c3cfd9;
  span {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color: #e8833a;
  }
`;

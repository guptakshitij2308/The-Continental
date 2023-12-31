import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const StyledName = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 2px;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="../assets/Continental-Logo.png" alt="Logo" />
      <StyledName>The Continental</StyledName>
    </StyledLogo>
  );
}

export default Logo;

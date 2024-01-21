import { styled, css } from "styled-components"; // eslint-disable-line

// const test = css`
//   text-align: center;
// `;

/*  ${test} */

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    // props.type === "h2" &&
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
    line-height: 1.4;
`;

export default Heading;

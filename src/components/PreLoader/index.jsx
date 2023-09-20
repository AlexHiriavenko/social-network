import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled("span")({
    width: "48px",
    height: "48px",
    border: "5px solid #1B74E4",
    borderBottomColor: "transparent",
    borderRadius: "50%",
    display: "inline-block",
    boxSizing: "border-box",
    animation: `${rotation} 1s linear infinite`,
});

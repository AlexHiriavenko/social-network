import styled from "@emotion/styled";
import CloseBtn from "../SVG/CloseBtn";
import SvgFacebook from "../SVG/FaceBook";

const StyledPictureSection = styled("section")({
  backgroundColor: "#000",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 2222,
  width: "100vw",
  height: "100vh",
  paddingRight: "20px",
  paddingLeft: "20px",
});
const StyledPictureCloseWrap = styled("div")({
  display: "flex",
  columnGap: "20px",
  alignItems: "center",
  marginTop: "10px"
});
export default function Pictures() {
  return (
    <StyledPictureSection>
      <StyledPictureCloseWrap>
        <CloseBtn />
        <SvgFacebook />
      </StyledPictureCloseWrap>
    </StyledPictureSection>
  );
}

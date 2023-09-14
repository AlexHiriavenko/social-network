import styled from "@emotion/styled";
import CloseBtn from "../SVG/CloseBtn";
import SvgFacebook from "../SVG/FaceBook";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { closePictures } from "../../redux/pictures.slice/picture.slice";
import { useEffect, useState } from "react";

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
  display: "none",
});
const StyledPictureCloseWrap = styled("div")({
  display: "flex",
  columnGap: "20px",
  alignItems: "center",
  position: "absolute",
  top: "10px",
  left: "20px",
  cursor: "pointer",
});
const StyledPictureWrap = styled("div")({
  display: "flex",
  columnGap: "20px",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});
const StyledArrowBtn = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#e4e6eb9e",
  width: 48 + "px",
  height: 48 + "px",
  borderRadius: "50%",
  transitionDuration: "400ms",
  ":hover": {
    backgroundColor: "#e4e6eb",
    transform: "translateX(10px)",
  },
  ":first-of-type": {
    ":hover": { transform: "translateX(-10px)" },
  },
});
const StyledPicture = styled("img")({
  maxWidth: "70%",
  maxHeight: "100vh",
  minWidth: "50%",
  objectFit: "cover",
});

export default function Pictures() {
  // Constants
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.pictures.isOpen);
  const pictures = useSelector((state) => state.pictures.pictures);
  // State
  const [showedPicture, setShowedPicture] = useState("");
  // Functions
  function handleClose() {
    dispatch(closePictures());
  }
  function showPrev() {
    if (showedPicture.number !== 0) {
      setShowedPicture({
        ...pictures.allPictures[showedPicture.number - 1],
        number: showedPicture.number - 1,
      });
    } else {
      setShowedPicture({
        ...pictures.allPictures[pictures.allPictures.length - 1],
        number: pictures.allPictures.length - 1,
      });
    }
  }
  function showNext() {
    if (pictures.allPictures.length - 1 !== showedPicture.number) {
      setShowedPicture({
        ...pictures.allPictures[showedPicture.number + 1],
        number: showedPicture.number + 1,
      });
    } else {
      setShowedPicture({
        ...pictures.allPictures[0],
        number: 0,
      });
    }
  }
  // useEffect
  useEffect(() => {
    // console.log(pictures);
    pictures.allPictures?.forEach((item, index) => {
      if (item[pictures.pathName] === pictures?.selected[pictures.pathName]) {
        setShowedPicture({ ...pictures.selected, number: index });
      }
    });
  }, [pictures]);
  return (
    <StyledPictureSection style={{ display: isOpen && "block" }}>
      <StyledPictureCloseWrap onClick={handleClose}>
        <CloseBtn />
        <SvgFacebook />
      </StyledPictureCloseWrap>
      <StyledPictureWrap>
        {pictures?.allPictures?.length > 1 && (
          <StyledArrowBtn onClick={showPrev}>
            <ArrowBackIosNewIcon />
          </StyledArrowBtn>
        )}

        <StyledPicture src={showedPicture[pictures.pathName]} />
        {pictures?.allPictures?.length > 1 && (
          <StyledArrowBtn onClick={showNext}>
            <ArrowForwardIosIcon />
          </StyledArrowBtn>
        )}
      </StyledPictureWrap>
    </StyledPictureSection>
  );
}

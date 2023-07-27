import { useNavigate } from "react-router-dom";
import ProfilePageButton from "../ProfilePageButton/ProfilePageButton";
import IntroBio from "./IntroBio";
import { Box, Typography } from "@mui/material";
import {
  ContentBlock,
  ContentBlockTitel,
} from "../StyledComponents/ContentBlock/StyledComponents";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const mockIntor = {
  city: "Dnipro",
  bio: "some bio",
};

const StyledIntroContentBlock = styled(ContentBlock)(({ theme }) => ({
  maxWidth: "680px",
  flexDirection: "column",
}));
const StyledIntroContentWrapper = styled(Box)({
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingBottom: "20px",
});
const StyledIntroText = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  textAlign: "center",
  marginRight: "50%",
  transform: "translateX(50%)",
  marginBottom: "10px",
}));
export default function ProfileIntro() {
  // Constants
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  // States
  const [isEdit, setInputStatus] = useState(false);
  const [userAbout, setUserAbout] = useState("");
  const [isAuthorized, setAuthorized] = useState(false);
  // Functions
  function editBio() {
    setInputStatus(!isEdit);
  }
  // UseEffect
  useEffect(() => {
    if (user && user.about) {
      setUserAbout(user.about);
    }
    setAuthorized(user.isAuthorized);
  }, [user]);
  return (
    <StyledIntroContentBlock>
      <ContentBlockTitel>Intro</ContentBlockTitel>
      <StyledIntroContentWrapper>
        {!isEdit && (
          <>
            <StyledIntroText>{userAbout}</StyledIntroText>
            {isAuthorized && (
              <ProfilePageButton
                text={userAbout !== "" ? "Edit bio" : "Add bio"}
                clickAction={editBio}
                style={{ width: "100%" }}
              />
            )}
          </>
        )}
        {isAuthorized && (
          <>
            <IntroBio
              edit={isEdit}
              userAbout={userAbout}
              setEditState={editBio}
            />
            <ProfilePageButton
              text={"Add details"}
              clickAction={() => {
                navigate("/profile/about");
              }}
              style={{ width: "100%", marginTop: "15px" }}
            />
          </>
        )}
      </StyledIntroContentWrapper>
    </StyledIntroContentBlock>
  );
}

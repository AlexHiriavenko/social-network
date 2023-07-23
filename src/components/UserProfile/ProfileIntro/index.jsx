import { useNavigate } from "react-router-dom";
import ProfilePageButton from "../ProfilePageButton/ProfilePageButton";
import IntroBio from "./IntroBio";
import { Box } from "@mui/material";
import {
  ContentBlock,
  ContentBlockTitel,
} from "../StyledComponents/ContentBlock/StyledComponents";
import styled from "@emotion/styled";
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
export default function ProfileIntro() {
  const navigate = useNavigate();
  return (
    <StyledIntroContentBlock>
      <ContentBlockTitel>Intro</ContentBlockTitel>
      <StyledIntroContentWrapper>
        <IntroBio />
        <ProfilePageButton
          text={"Add details"}
          clickAction={() => {
            navigate("/profile/about");
          }}
          style={{ width: "100%", marginTop: "15px" }}
        />
      </StyledIntroContentWrapper>
    </StyledIntroContentBlock>
  );
}

import styled from "@emotion/styled";
import Photos from "../../../components/UserProfile/ProfilePhotos";
import { ProfileContainer } from "../../../components/UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { Box } from "@mui/material";

const StyledPhotosPage = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.page,
  paddingTop: "20px",
  paddingBottom: "20px",
}));

export default function ProfilePhotos() {
  return (
    <StyledPhotosPage>
      <ProfileContainer>
        <Photos />
      </ProfileContainer>
    </StyledPhotosPage>
  );
}

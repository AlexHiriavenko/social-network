import styled from "@emotion/styled";
import FriendsList from "../../../components/UserProfile/ProfileFriends/FriendsList";
import { Box } from "@mui/material";
import { ProfileContainer } from "../../../components/UserProfile/StyledComponents/ContentBlock/StyledComponents";

const StyledFriendsPage = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.page,
  paddingTop: "20px",
  paddingBottom: "20px",
}));

export default function ProfileFriends() {
  return (
    <StyledFriendsPage>
      <ProfileContainer>
        <FriendsList />
      </ProfileContainer>
    </StyledFriendsPage>
  );
}

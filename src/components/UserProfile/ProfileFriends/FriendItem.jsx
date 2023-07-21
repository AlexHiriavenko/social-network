import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const StyledFriendItem = styled(Box)(({ theme }) => ({
  border: `0.3px solid ${theme.palette.backgroundColor.pageSeparator}`,
  borderRadius: "10px",
  display: "flex",
  padding: "16px",
  columnGap: "15px",
}));
const StyledFriendImage = styled("img")({
  objectFit: "cover",
  borderRadius: "10px",
});
const StyledFriendInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const StyledFriendName = styled("a")(({ theme }) => ({
  fontSize: "17px",
  color: theme.palette.textColor.main,
  fontWeight: 600,
  borderBottom: "2px solid transparent",
  lineHeight: "90%",
  transitionDuration: "500ms",
  cursor: "pointer",
  "&:hover": {
    borderBottom: `2px solid ${theme.palette.textColor.main}`,
  },
}));
const StyledFriendMutualFriends = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.textColor.main,
  lineHeight: "150%",
}));

export default function FriendItem({ userPhoto, userName, mutualFriends }) {
  return (
    <StyledFriendItem>
      <StyledFriendImage
        src={userPhoto}
        alt="userImage"
        width={80}
        height={80}
      />
      <StyledFriendInfo>
        <StyledFriendName>{userName}</StyledFriendName>
        <StyledFriendMutualFriends>
          {mutualFriends && `${mutualFriends} mutual friends`}
        </StyledFriendMutualFriends>
      </StyledFriendInfo>
    </StyledFriendItem>
  );
}

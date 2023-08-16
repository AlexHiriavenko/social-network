import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFriends,
  getUser,
  setFriends,
  setUser,
} from "../../../redux/user.slice/user.slice";

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
  cursor: "pointer",
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
  fontFamily: "sans-serif",
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

export default function FriendItem({ friend, mutualFriends }) {
  // Constants
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authorizedUser);
  // Function
  function lookUser(id) {
    // get user friends
    const userFriendsResponse = dispatch(getFriends(id));
    userFriendsResponse
      .then((data) => {
        dispatch(setFriends(data.payload));
        localStorage.setItem("friends", JSON.stringify(data.payload));
      })
      .catch((error) => console.log(error.message));
    // checking if the user is authorized
    if (id === authUser.id) {
      dispatch(setUser(authUser));
      localStorage.setItem("user", JSON.stringify(authUser));
      navigate("/profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const userResponse = dispatch(getUser(id));
      userResponse
        .then((data) => {
          dispatch(setUser(data.payload));
          localStorage.setItem("user", JSON.stringify(data.payload));
          navigate("/profile");
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => error.message);
    }
  }
  return (
    <StyledFriendItem>
      <StyledFriendImage
        src={
          friend.profilePicture ||
          "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
        }
        alt="userImage"
        width={80}
        height={80}
        onClick={() => lookUser(friend.id)}
      />
      <StyledFriendInfo>
        <StyledFriendName onClick={() => lookUser(friend.id)}>
          {friend.fullName}
        </StyledFriendName>
        <StyledFriendMutualFriends>
          {mutualFriends.length !== 0 &&
            `${mutualFriends.length} mutual friends`}
        </StyledFriendMutualFriends>
      </StyledFriendInfo>
    </StyledFriendItem>
  );
}

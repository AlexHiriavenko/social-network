import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { openCreateModal } from "../../../redux/modal.slice/modal.slice";
import { useDispatch, useSelector } from "react-redux";
import { BlockUserImage } from "../../UserProfile/StyledComponents/ContentBlock/StyledComponents";

const StyledCreatePost = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.section,
  borderRadius: "12px",
  padding: "20px 16px",
  width: "100%",
  maxWidth: "680px",
  marginLeft: "auto",
  marginRight: "auto",
  fontFamily: "sans-serif",
}));
const StyledCreatePostHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
});
const StyledCreatePostInput = styled("input")(({ theme }) => ({
  border: "none",
  borderRadius: "25px",
  backgroundColor: theme.palette.input.mainBackground,
  width: "100%",
  padding: "8px 12px",
  lineHeight: "22px",
  fontSize: "17px",
  color: theme.palette.textColor.secondary,
  "&:focus": {
    outline: "none",
  },
}));
const StyledCreatePostSeparator = styled("span")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "1px",
  backgroundColor: theme.palette.backgroundColor.pageSeparator,
  marginTop: "12px",
  marginBottom: "8px",
}));
const StyledCreatePostButtons = styled(Box)({
  display: "flex",
  justifyContent: "center",
});
const StyledCreatePostButton = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "5px",
  borderRadius: "10px",
  transitionDuration: "300ms",
  color: theme.palette.textColor.main,
  "&:hover": {
    backgroundColor: theme.palette.input.mainBackground,
  },
}));

export default function CreatePost() {
  // Constants
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authorizedUser);
  // Functions
  const handleOpen = () => dispatch(openCreateModal());

  return (
    <StyledCreatePost>
      <StyledCreatePostHeader>
        <BlockUserImage
          src={
            (authUser && authUser.profilePicture) ||
            "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
          }
          alt=""
          width={40}
          height={40}
        />
        <StyledCreatePostInput
          type="text"
          value={"What`s on your mind?"}
          onClick={handleOpen}
          onChange={handleOpen}
        />
      </StyledCreatePostHeader>
      <StyledCreatePostSeparator></StyledCreatePostSeparator>
      <StyledCreatePostButtons>
        <StyledCreatePostButton onClick={handleOpen}>
          <AddPhotoAlternateIcon
            sx={{ color: "#45bd62", width: "36px", height: "36px" }}
          />
          Photo/Video
        </StyledCreatePostButton>
      </StyledCreatePostButtons>
    </StyledCreatePost>
  );
}

import { styled } from "@mui/material/styles";
import { Typography, Box, Avatar, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { StyledPostModalAddFilesButton } from "../../../components/Modals/CreatePostModal";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.hoverColor.dark,
    minWidth: "40px",
    minHeight: "40px",
    cursor: "pointer",
    transitionDuration: "0.5s",
    "&:hover": {
        backgroundColor: theme.palette.buttonColor.backgroundHover,
    },
}));

export const StyledChatHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.backgroundColor.section,
    width: "100%",
    padding: "16px",
}));

export const BtnDeleteMessage = styled(DeleteOutlineIcon)(({ theme }) => ({
    color: theme.palette.textColor.primary,
    minWidth: "24px",
    minHeight: "24px",
    cursor: "pointer",
}));

export const BtnEditMessage = styled(EditIcon)(({ theme }) => ({
    color: theme.palette.textColor.primary,
    minWidth: "24px",
    minHeight: "24px",
    cursor: "pointer",
}));

export const WrapMessage = styled(Box)(({ theme, className }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "@media (max-width: 480px)": {},
    ...className,
}));

export const WrapBns = styled(Box)(({ theme, className }) => ({
    display: "flex",
    gap: "8px",
    "@media (max-width: 480px)": {
        flexDirection: "column",
        gap: "4px",
    },
    ...className,
}));

export const ChatFooterContainer = styled(Box)(({ theme, className }) => ({
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginTop: "16px",

    ...className,
}));

export const AuthUserMessage = styled(Typography)(({ theme, className }) => ({
    backgroundColor: "#1B74E4",
    color: "#ffffff",
    padding: "16px",
    minWidth: "200px",
    maxWidth: "300px",
    borderRadius: "16px",
    ...className,
}));

export const PartnerUserMessage = styled(Typography)(({ theme, className }) => ({
    backgroundColor: "lightgray",
    padding: "16px",
    minWidth: "200px",
    maxWidth: "300px",
    borderRadius: "16px",
    ...className,
}));

export const StyledLink = styled(Link)(({ theme, className }) => ({
    display: "flex",
    alignItems: "center",
    gap: 8,
    ...className,
}));

export const ContainerMessageImgs = styled("div")(({ theme, className }) => ({
    marginTop: "8px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "end",
    alignContent: "start",
    ...className,
}));

export const AddImgsIcon = styled(AddPhotoAlternateIcon)(({ theme, className }) => ({
    display: "inline-block",
    color: "#45bd62",
    minWidth: "24px",
    minHeight: "24px",
    boxSizing: "content-box",
    ...className,
}));

export const BtnSendMessage = styled(IconButton)(({ theme, className }) => ({
    minWidth: "40px",
    minHeight: "40px",
    cursor: "pointer",
    transitionDuration: "0.5s",
    backgroundColor: theme.palette.hoverColor.secondary,
    "&:hover": {
        backgroundColor: theme.palette.buttonColor.backgroundHover,
    },
    p: "8px",
    boxSizing: "content-box",
    mb: "8px",
    ...className,
}));

export const WrapperAddImgs = styled(StyledPostModalAddFilesButton)(({ theme, className }) => ({
    paddingBlock: "8px",
    paddingInline: "8px",
    boxSizing: "content-box",
    cursor: "pointer",
    position: "absolute",
    right: 0,
    top: "8px",
    ...className,
}));

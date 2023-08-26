import { Typography, Box, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteTemporaryParticipant } from "../../../../../redux/chat.slice/chat.slice";

function NewMessageHeader({ setNewMessageModal }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    function handleClose() {
        setNewMessageModal(false);
        dispatch(deleteTemporaryParticipant());
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pr: 2,
            }}
        >
            <Typography
                variant="h5"
                component={"h4"}
                fontWeight={600}
                color={theme.palette.textColor.content}
            >
                New Message
            </Typography>
            <Avatar
                sx={{
                    bgcolor: theme.palette.hoverColor.dark,
                    minWidth: "40px",
                    minHeight: "40px",
                    cursor: "pointer",
                    transitionDuration: "0.5s",
                    "&:hover": {
                        backgroundColor: theme.palette.buttonColor.backgroundHover,
                    },
                }}
                onClick={handleClose}
            >
                <CloseIcon
                    sx={{
                        color: theme.palette.textColor.content,
                    }}
                />
            </Avatar>
        </Box>
    );
}

export default NewMessageHeader;

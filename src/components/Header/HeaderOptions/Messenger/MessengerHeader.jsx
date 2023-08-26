import { IconButton, Typography, Tooltip, Box } from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function MessengerHeader(props) {
    const theme = useTheme();
    const { toggleMenu, setNewMessageModal } = props;
    const navigate = useNavigate();

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
                Chats
            </Typography>
            <Box>
                <Tooltip title="See all in Messenger">
                    <IconButton
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.hoverColor.main,
                            },
                        }}
                        onClick={(event) => {
                            if (event.target.closest("button")) {
                                navigate("/chats");
                                toggleMenu();
                            }
                        }}
                    >
                        <ZoomOutMapIcon sx={{ color: theme.palette.textColor.content }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="New Chat" sx={{ ml: 0.5 }}>
                    <IconButton
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.hoverColor.main,
                            },
                        }}
                        onClick={() => setNewMessageModal(true)}
                    >
                        <EditNoteIcon
                            sx={{ color: theme.palette.textColor.content }}
                            fontSize="large"
                        />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default MessengerHeader;

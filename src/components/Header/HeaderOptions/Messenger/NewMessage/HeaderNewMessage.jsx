import { useState } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import SearchForHomePage from "../../../../Search/SearchForHomePage";
import GlobalUsersList from "./GlobalUsersList";

function HeaderNewMessage(props) {
    const theme = useTheme();
    const { setNewMessageModal } = props;
    const [foundUser, setFoundUser] = useState([]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pl: 2,
                    pr: 2,
                }}>
                <Typography
                    variant="h5"
                    component={"h4"}
                    fontWeight={600}
                    color={theme.palette.textColor.content}>
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
                            backgroundColor:
                                theme.palette.buttonColor.backgroundHover,
                        },
                    }}
                    onClick={() => setNewMessageModal(false)}>
                    <CloseIcon
                        sx={{
                            color: theme.palette.textColor.content,
                        }}
                    />
                </Avatar>
            </Box>
            <Box sx={{ p: 1 }}>
                <SearchForHomePage setFoundUser={setFoundUser} />
                <GlobalUsersList users={foundUser} />
            </Box>
        </>
    );
}

export default HeaderNewMessage;

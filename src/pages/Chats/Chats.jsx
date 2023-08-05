import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatContent from "./ChatContent/ChatContent";
import { mockInfo } from "../../components/Header/HeaderSearch/SeacrhComponents/mockData";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge, Box } from "@mui/material";
import { openPageChat } from "../../redux/chat.slice/chat.slice";

function Chats() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [user1, setUser1] = useState([]);
    const handlerChat = (id) => {
        const user = mockInfo.find((users) => users.userID === id);
        dispatch(openPageChat());
        setUser1(user);
    };
    return (
        <div
            // className="container-page"
            style={{ display: "flex" }}
        >
            <Sidebar>
                {mockInfo.map((user) => {
                    return (
                        <MenuItem
                            key={user.userID}
                            onClick={() => handlerChat(user.userID)}
                            sx={{
                                display: "flex",
                                gap: 1,
                                whiteSpace: "normal",
                                mb: 1,
                            }}
                        >
                            <Avatar
                                sx={{ minWidth: "40px", minHeight: "40px" }}
                                alt="user icon"
                                src={user.userPhoto}
                            ></Avatar>
                            <Box>
                                <Typography fontSize={15} fontWeight={600}>
                                    {user.userName}
                                </Typography>
                                <Typography fontSize={14} noWrap>
                                    {user.message}
                                </Typography>
                            </Box>
                        </MenuItem>
                    );
                })}
            </Sidebar>
            <ChatContent user={user1}></ChatContent>
        </div>
    );
}

export default Chats;

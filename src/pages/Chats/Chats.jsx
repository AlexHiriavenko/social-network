import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatForm from "./ChatForm/ChatForm";
import UsersList from "../../components/UsersList/UsersList";
import ChatContent from "./ChatContent/ChatContent";
import { mockInfo } from "../../components/Header/HeaderSearch/SeacrhComponents/mockData";
import { Typography, Avatar, MenuItem, Box } from "@mui/material";
import { openPageChat } from "../../redux/chat.slice/chat.slice";
import {
    getChatsParticipants,
    getChat,
} from "../../redux/chat.slice/chat.slice";

function Chats() {
    const dispatch = useDispatch();
    const theme = useTheme();
    // const currentUser = useSelector((state) => state.user.user);
    // const currentUserId = currentUser.id;

    const chatParticipants = useSelector(
        (state) => state.chat.chatsParticipants
    );

    useEffect(() => {
        dispatch(getChatsParticipants());
        // dispatch(getChat(1));
    }, [dispatch]);

    // const [user1, setUser1] = useState([]);
    const handlerChat = (id) => {
        const user = mockInfo.find((users) => users.userID === id);
        dispatch(openPageChat());
        setUser1(user);
    };
    return (
        <div
            style={{
                display: "flex",
                backgroundColor: theme.palette.backgroundColor.card,
                minHeight: "100%",
            }}>
            <Sidebar>
                <UsersList usersList={chatParticipants} />
            </Sidebar>
            {/* <ChatContent></ChatContent> */}
            <ChatForm></ChatForm>
        </div>
    );
}

export default Chats;

{
    /* {mockInfo.map((user) => {
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
                })} */
}

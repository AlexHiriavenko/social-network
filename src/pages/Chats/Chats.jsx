import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatContent from "./ChatContent/ChatContent";
import { mockInfo } from "../../components/Header/HeaderSearch/SeacrhComponents/mockData";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge, Box } from "@mui/material";
import { openPageChat } from "../../redux/chat.slice/chat.slice";
import { getUser1 } from "../../redux/test.slice/test.slice";
// import { setUser2 } from "../../redux/test.slice/test.slice";

function Chats() {
    const theme = useTheme();
    const currentUser = useSelector((state) => state.user.user);
    const currentUserId = currentUser.id;

    const abc = useSelector((state) => state.test.userTest);
    console.log(abc);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser1(currentUserId)); // Здесь уже не нужно оборачивать в then
    }, [dispatch, currentUserId]);

    const [user1, setUser1] = useState([]);
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
            }}
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
                {abc.map((el) => {
                    return <p key={el.id}>{el.fullName}</p>;
                })}
            </Sidebar>
            <ChatContent user={user1}></ChatContent>
        </div>
    );
}

export default Chats;

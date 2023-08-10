import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatBody from "./ChatBody/ChatBody";
import UsersList from "./UsersList/UsersList";
import { getChatsParticipants } from "../../redux/chat.slice/chat.slice";

function Chats() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const chatParticipants = useSelector(
        (state) => state.chat.chatsParticipants
    );

    const currentChat = useSelector((state) => state.chat.currentChat);

    useEffect(() => {
        dispatch(getChatsParticipants());
    }, [dispatch, currentChat]);

    return (
        <div
            style={{
                display: "flex",
                backgroundColor: theme.palette.backgroundColor.card,
                minHeight: "93.2%",
            }}>
            <Sidebar>
                <UsersList usersList={chatParticipants} />
            </Sidebar>
            <ChatBody />
        </div>
    );
}

export default Chats;

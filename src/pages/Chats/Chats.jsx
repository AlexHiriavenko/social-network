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

    const currentChat = useSelector((state) => state.chat.currentChat);

    useEffect(() => {
        dispatch(getChatsParticipants());
    }, [dispatch, currentChat]);

    return (
        <div
            style={{
                backgroundColor: theme.palette.backgroundColor.card,
                height: "calc(100% - 65px)",
                overflow: "hidden",
            }}
        >
            <div
                className="container-page"
                style={{
                    display: "flex",
                    backgroundColor: theme.palette.backgroundColor.card,
                    height: "calc(100% - 65px)",
                }}
            >
                <Sidebar>
                    <UsersList />
                </Sidebar>
                <ChatBody />
            </div>
        </div>
    );
}

export default Chats;

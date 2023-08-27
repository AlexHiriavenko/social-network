import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessengerSidebarHeader from "./MessengerSidebarHeader/MessengerSidebarHeader";
import ChatBody from "./ChatBody/ChatBody";
import UsersList from "./UsersList/UsersList";
import { getChatsParticipants } from "../../redux/chat.slice/chat.slice";

function Chats() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [newMessageDialog, setNewMessageDialog] = useState(false);

    useEffect(() => {
        dispatch(getChatsParticipants());
    }, [dispatch]);

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
                    <MessengerSidebarHeader setNewMessageDialog={setNewMessageDialog} />
                    <UsersList setNewMessageDialog={setNewMessageDialog} />
                </Sidebar>
                <ChatBody
                    newMessageDialog={newMessageDialog}
                    setNewMessageDialog={setNewMessageDialog}
                />
            </div>
        </div>
    );
}

export default Chats;

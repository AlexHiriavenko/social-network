import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessengerSidebarHeader from "./MessengerSidebarHeader/MessengerSidebarHeader";
import ChatBody from "./ChatBody/ChatBody";
import ChatsList from "./ChatsList/ChatsList";
import { getChatsParticipants } from "../../redux/chat.slice/chat.slice";
import { Container, ContainerFlex } from "./styledChatComponents";

function Chats() {
    const dispatch = useDispatch();

    const [newMessageDialog, setNewMessageDialog] = useState(false);

    useEffect(() => {
        dispatch(getChatsParticipants());
    }, [dispatch]);

    return (
        <Container>
            <ContainerFlex>
                <Sidebar>
                    <MessengerSidebarHeader setNewMessageDialog={setNewMessageDialog} />
                    <ChatsList setNewMessageDialog={setNewMessageDialog} />
                </Sidebar>
                <ChatBody
                    newMessageDialog={newMessageDialog}
                    setNewMessageDialog={setNewMessageDialog}
                />
            </ContainerFlex>
        </Container>
    );
}

export default Chats;

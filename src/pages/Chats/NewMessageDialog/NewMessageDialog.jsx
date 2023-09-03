import { useState } from "react";
import SearchForHomePage from "../../../components/Search/SearchForHomePage";
import NewChatHead from "../../../components/Header/HeaderOptions/Messenger/NewChat/NewChatHead";
import GlobalUsersList from "../../../components/Header/HeaderOptions/Messenger/NewChat/GlobalUsersList";

function NewMessageDialog({ setNewMessageModal }) {
    const [foundUser, setFoundUser] = useState([]);

    return (
        <div style={{ width: "100%", padding: "8px 8px" }}>
            <NewChatHead setNewMessageModal={setNewMessageModal} />
            <SearchForHomePage setFoundUser={setFoundUser} />
            <GlobalUsersList users={foundUser} setNewMessageModal={setNewMessageModal} />
        </div>
    );
}

export default NewMessageDialog;

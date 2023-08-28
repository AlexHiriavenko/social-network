import { useState } from "react";
import SearchForHomePage from "../../../components/Search/SearchForHomePage";
import NewMessageHeader from "../../../components/Header/HeaderOptions/Messenger/NewMessage/NewMessageHeader";
import GlobalUsersList from "../../../components/Header/HeaderOptions/Messenger/NewMessage/GlobalUsersList";

function NewMessageDialog({ setNewMessageModal }) {
    const [foundUser, setFoundUser] = useState([]);

    return (
        <div style={{ width: "100%", padding: "8px 8px" }}>
            <NewMessageHeader setNewMessageModal={setNewMessageModal}></NewMessageHeader>
            <SearchForHomePage setFoundUser={setFoundUser}></SearchForHomePage>
            <GlobalUsersList
                users={foundUser}
                setNewMessageModal={setNewMessageModal}
            ></GlobalUsersList>
        </div>
    );
}

export default NewMessageDialog;

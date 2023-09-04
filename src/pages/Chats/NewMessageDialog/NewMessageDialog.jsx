import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Divider } from "@mui/material";
import SearchForHomePage from "../../../components/Search/SearchForHomePage";
import NewChatHead from "../../../components/Header/HeaderOptions/Messenger/NewChat/NewChatHead";
import GlobalUsersList from "../../../components/Header/HeaderOptions/Messenger/NewChat/GlobalUsersList";

function NewMessageDialog({ setNewMessageModal }) {
    const theme = useTheme();
    const [foundUser, setFoundUser] = useState([]);
    const bg = theme.palette.backgroundColor.pageSeparator;

    return (
        <div style={{ width: "100%", padding: "8px 8px" }}>
            <NewChatHead setNewMessageModal={setNewMessageModal} />
            <SearchForHomePage setFoundUser={setFoundUser} />
            <Divider sx={{ bgcolor: bg, mt: 2 }} />
            <GlobalUsersList users={foundUser} setNewMessageModal={setNewMessageModal} />
        </div>
    );
}

export default NewMessageDialog;

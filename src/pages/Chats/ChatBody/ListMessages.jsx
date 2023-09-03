import { useSelector } from "react-redux";
import { List } from "@mui/material";
import ItemListMessage from "./ItemListMessage";

function ListMessages() {
    const { messages } = useSelector((state) => state.chat.currentChat);

    const sortedMessages =
        messages.length > 1
            ? messages.toSorted((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
            : messages;

    return (
        <List className="chat-body__list">
            {sortedMessages.map((message) => (
                <ItemListMessage key={message.id} message={message} />
            ))}
        </List>
    );
}

export default ListMessages;

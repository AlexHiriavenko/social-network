import { List } from "@mui/material/";
import GlobalUsersListItem from "./GlobalUsersListItem";

function GlobalUsersList({ users, setNewMessageModal }) {
    return (
        <List sx={{ minHeight: "500px" }}>
            {users?.map((user) => (
                <GlobalUsersListItem
                    key={user.id}
                    user={user}
                    setNewMessageModal={setNewMessageModal}
                />
            ))}
        </List>
    );
}

export default GlobalUsersList;

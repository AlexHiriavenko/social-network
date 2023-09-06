import { useState, useEffect } from "react";
import { List, Typography } from "@mui/material/";
import UsersListItem from "./UsersListItem";

function UsersListGlobal({ users }) {
    const [alertMessage, setAlertMessage] = useState(false);

    useEffect(() => () => setAlertMessage(false), []);

    return (
        <>
            {alertMessage && (
                <Typography color={"error"} align="center">
                    This user is already in the chat! It is not possible to add
                    an existing user again.
                </Typography>
            )}
            <List sx={{ minHeight: "340px" }}>
                {users?.map((user) => (
                    <UsersListItem
                        key={user.id}
                        user={user}
                        setAlertMessage={setAlertMessage}
                    />
                ))}
            </List>
        </>
    );
}

export default UsersListGlobal;

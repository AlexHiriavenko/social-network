import { useState } from "react";
import { List, ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function UsersList(props) {
    const theme = useTheme();
    const { usersList } = props;

    return (
        <List>
            {!usersList.length && (
                <Typography sx={{ p: 2 }} color={theme.palette.textColor.content}>
                    No history yet
                </Typography>
            )}
            {usersList.map(({ id: chatId, profilePicture, fullName }) => (
                <ListItem
                    key={chatId}
                    sx={{
                        gap: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.main,
                        },
                    }}
                    className="search__list-item"
                >
                    <Link className="search__user-link">
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={profilePicture}
                        ></Avatar>
                        <Typography
                            className="search__user-name"
                            color={theme.palette.textColor.content}
                        >
                            {fullName}
                        </Typography>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}

export default UsersList;

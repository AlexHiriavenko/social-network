import { useState } from "react";
import { List, ListItem, Typography, Avatar } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { mockInfo } from "./mockData";

function ListRecentSearches(props) {
    const onClick = props.onClick;

    const [recentUsersList, setRecentUsersList] = useState(mockInfo);

    const handleRemoveUser = (event) => {
        const target = event.target.closest(".search__user-remove");
        if (target) {
            const id = parseInt(target.id);
            setRecentUsersList((prevList) =>
                prevList.filter((user) => user.userID !== id)
            );
        }
    };

    return (
        <List>
            {!recentUsersList.length && (
                <Typography sx={{ p: 2 }}>No search history yet</Typography>
            )}
            {recentUsersList.map((friend) => (
                <ListItem
                    key={friend.userID}
                    sx={{ gap: 1 }}
                    className="search__list-item"
                >
                    <Link
                        to={`./user-page/${friend.userID}`}
                        onClick={onClick}
                        className="search__user-link"
                    >
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={friend.userPhoto}
                        ></Avatar>
                        <Typography className="search__user-name">
                            {friend.userName}
                        </Typography>
                    </Link>
                    <CloseIcon
                        id={friend.userID}
                        onClick={handleRemoveUser}
                        className="search__user-remove"
                    ></CloseIcon>
                </ListItem>
            ))}
        </List>
    );
}

export default ListRecentSearches;

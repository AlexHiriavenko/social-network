import { useState } from "react";
import { List, ListItem, Typography, Avatar } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { mockInfo } from "./mockData";
import { useTheme } from "@mui/material/styles";

function ListRecentSearches(props) {
    const theme = useTheme();
    const onClick = props.onClick;

    const [recentUsersList, setRecentUsersList] = useState(mockInfo);

    const handleRemoveUser = (event) => {
        const target = event.target.closest(".search__user-remove");
        if (target) {
            const id = parseInt(target.id);
            setRecentUsersList((prevList) => prevList.filter((user) => user.userID !== id));
        }
    };

    return (
        <List>
            {!recentUsersList.length && (
                <Typography sx={{ p: 2 }} color={theme.palette.textColor.content}>
                    No search history yet
                </Typography>
            )}
            {props.users?.map((user) => (
                <ListItem
                    key={user.id}
                    sx={{
                        gap: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.main,
                        },
                    }}
                    className="search__list-item"
                >
                    <Link
                        to={`/${user.id}`}
                        onClick={onClick}
                        className="search__user-link"
                    >
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={user.profilePicture}
                        ></Avatar>
                        <Typography
                            className="search__user-name"
                            color={theme.palette.textColor.content}
                        >
                            {user.fullName}
                        </Typography>
                    </Link>
                    <CloseIcon
                        id={user.id}
                        onClick={handleRemoveUser}
                        className="search__user-remove"
                        sx={{
                            color: theme.palette.textColor.content,
                            "&:hover": {
                                backgroundColor: theme.palette.hoverColor.dark,
                            },
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
}

export default ListRecentSearches;

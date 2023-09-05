import { List, ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getFriends,
    setFriends,
    setUser,
} from "../../../../redux/user.slice/user.slice.js";

function ListRecentSearches(props) {
    const theme = useTheme();
    const onClick = props.onClick;
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.user.authorizedUser);
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        if (user === null) {
            dispatch(setUser(authUser));
            const userFriendsResponse = dispatch(getFriends(authUser.id));
            userFriendsResponse
                .then((data) => {
                    if (data.payload) {
                        dispatch(setFriends(data.payload));
                        localStorage.setItem(
                            "friends",
                            JSON.stringify(data.payload)
                        );
                    }
                })
                .catch((error) => console.log(error.message));
        }
    }, []);

    return (
        <List>
            {!props.users?.length && (
                <Typography
                    sx={{ p: 2 }}
                    color={theme.palette.textColor.content}>
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
                    }}>
                    <Link
                        to={
                            user.id === authUser.id
                                ? `/profile`
                                : `search/${user.id}`
                        }
                        onClick={onClick}
                        className="search__user-link">
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={user.profilePicture}></Avatar>
                        <Typography
                            className="search__user-name"
                            color={theme.palette.textColor.content}>
                            {user.fullName}
                        </Typography>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}

export default ListRecentSearches;

import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Group, Forum } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
    getFriends,
    setAuthorizedUser,
    setFriends,
    setUser,
} from "../../redux/user.slice/user.slice";

function HomeAsideLeft() {
    const theme = useTheme();
    const dispatch = useDispatch();

    let authorizedUser = useSelector((state) => state.user.authorizedUser);

    function showAuthorizedUser() {
        if (authorizedUser) {
            dispatch(
                setAuthorizedUser(
                    JSON.parse(localStorage.getItem("authorizedUser"))
                )
            );
            authorizedUser = JSON.parse(localStorage.getItem("authorizedUser"));
        }
        dispatch(setUser(authorizedUser));
        localStorage.setItem("user", JSON.stringify(authorizedUser));
        window.scrollTo({ top: 0, behavior: "smooth" });

        const userFriendsResponse = dispatch(getFriends(authorizedUser.id));
        userFriendsResponse
            .then((data) => {
                dispatch(setFriends(data.payload));
                localStorage.setItem("friends", JSON.stringify(data.payload));
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <aside
            className="sidebar-home sidebar-home-left"
            style={{
                backgroundColor: theme.palette.backgroundColor.page,
                borderRight: theme.palette.border.transp,
            }}>
            <List sx={{ mt: 1 }}>
                <ListItem
                    className="search__list-item home__list-item"
                    sx={{
                        mb: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.secondary,
                        },
                    }}>
                    <Link
                        className="header__menu-item-link"
                        to={"/profile"}
                        onClick={showAuthorizedUser}>
                        {
                            authorizedUser&&
                        <Avatar
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={
                                authorizedUser
                                    ? authorizedUser.profilePicture
                                    : ""
                            }
                        /> }
                        <Typography
                            fontWeight={700}
                            fontSize={15}
                            sx={{
                                color: (theme) =>
                                    theme.palette.textColor.content,
                            }}>
                            {authorizedUser
                                ? authorizedUser.fullName
                                : null}
                        </Typography>
                    </Link>
                </ListItem>
                <ListItem
                    className="search__list-item home__list-item"
                    sx={{
                        mb: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.secondary,
                        },
                    }}>
                    <Link
                        className="header__menu-item-link"
                        to={"/friends/home"}>
                        <Group
                            sx={{
                                minWidth: "40px",
                                minHeight: "40px",
                                fontSize: "40px",
                            }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography
                            fontSize={15}
                            fontWeight={600}
                            sx={{
                                color: (theme) =>
                                    theme.palette.textColor.content,
                            }}>
                            Friends
                        </Typography>
                    </Link>
                </ListItem>

                <ListItem
                    className="search__list-item home__list-item"
                    sx={{
                        mb: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.secondary,
                        },
                    }}>
                    <Link className="header__menu-item-link" to={"/chats"}>
                        <Forum
                            sx={{
                                minWidth: "40px",
                                minHeight: "40px",
                                fontSize: "40px",
                            }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography
                            fontSize={15}
                            fontWeight={600}
                            sx={{
                                color: (theme) =>
                                    theme.palette.textColor.content,
                            }}>
                            Messenger
                        </Typography>
                    </Link>
                </ListItem>
            </List>
        </aside>
    );
}

export default HomeAsideLeft;

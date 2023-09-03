import { List, ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function ListRecentSearches(props) {
    const theme = useTheme();
    const onClick = props.onClick;

    return (
        <List>
            {!props.users?.length && (
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
                >
                    <Link to={`search/${user.id}`} onClick={onClick} className="search__user-link">
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
                </ListItem>
            ))}
        </List>
    );
}

export default ListRecentSearches;

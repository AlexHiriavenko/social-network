import { List, ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function GlobalUsersList(props) {
    const theme = useTheme();

    return (
        <List sx={{ minHeight: "340px" }}>
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
                    <Link className="search__user-link">
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

export default GlobalUsersList;

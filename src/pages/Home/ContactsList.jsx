import { List, ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { mockInfo } from "../../components/Header/HeaderSearch/SeacrhComponents/mockData";

function ContactsList() {
    const contactsList = mockInfo;
    const theme = useTheme();

    return (
        <List>
            {!contactsList.length && (
                <Typography sx={{ p: 2 }}>No search history yet</Typography>
            )}
            {contactsList.map((friend) => (
                <ListItem
                    key={friend.userID}
                    sx={{
                        gap: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.secondary,
                        },
                    }}
                    className="search__list-item home__list-item">
                    <Link
                        to={`./user-page/${friend.userID}`}
                        className="search__user-link">
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={friend.userPhoto}></Avatar>
                        <Typography
                            className="search__user-name"
                            color={theme.palette.textColor.secondary}>
                            {friend.userName}
                        </Typography>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}

export default ContactsList;

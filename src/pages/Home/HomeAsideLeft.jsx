import { List, ListItem, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";

function HomeAsideLeft() {
    const userName = "Julian Read";
    return (
        <aside className="sidebar-page">
            <List sx={{ mt: 1 }}>
                <ListItem className="search__list-item">
                    <Link className="header__menu-item-link" to={"/profile"}>
                        <Avatar
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                        />
                        <Typography fontWeight={700} fontSize={15}>
                            {userName}
                        </Typography>
                    </Link>
                </ListItem>
                <ListItem className="search__list-item">
                    <Link className="header__menu-item-link" to={"#"}>
                        <GroupIcon
                            sx={{ minWidth: "40px", minHeight: "40px", fontSize: "40px" }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography fontSize={15} fontWeight={600}>
                            Friends
                        </Typography>
                    </Link>
                </ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
            </List>
        </aside>
    );
}

export default HomeAsideLeft;

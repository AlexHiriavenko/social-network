import { List, ListItem, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Group, Store, OndemandVideo, Forum, Diversity3 } from "@mui/icons-material";

function HomeAsideLeft() {
    const userName = "Julian Read";
    return (
        <aside className="sidebar-home sidebar-home-left">
            <List sx={{ mt: 1 }}>
                <ListItem className="search__list-item home__list-item">
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
                <ListItem className="search__list-item home__list-item">
                    <Link className="header__menu-item-link" to={"#"}>
                        <Group
                            sx={{
                                minWidth: "40px",
                                minHeight: "40px",
                                fontSize: "40px",
                            }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography fontSize={15} fontWeight={600}>
                            Friends
                        </Typography>
                    </Link>
                </ListItem>
                <ListItem className="search__list-item home__list-item">
                    <Link className="header__menu-item-link" to={"/watch"}>
                        <OndemandVideo
                            sx={{
                                minWidth: "40px",
                                minHeight: "40px",
                                fontSize: "40px",
                            }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography fontSize={15} fontWeight={600}>
                            Watch
                        </Typography>
                    </Link>
                </ListItem>
                <ListItem className="search__list-item home__list-item">
                    <Link className="header__menu-item-link" to={"/marketplace"}>
                        <Store
                            sx={{
                                minWidth: "40px",
                                minHeight: "40px",
                                fontSize: "40px",
                            }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography fontSize={15} fontWeight={600}>
                            Marketplace
                        </Typography>
                    </Link>
                </ListItem>
                <ListItem className="search__list-item home__list-item">
                    <Link className="header__menu-item-link" to={"/groups"}>
                        <Diversity3
                            sx={{
                                minWidth: "40px",
                                minHeight: "40px",
                                fontSize: "40px",
                            }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography fontSize={15} fontWeight={600}>
                            Groups
                        </Typography>
                    </Link>
                </ListItem>
                <ListItem className="search__list-item home__list-item">
                    <Link className="header__menu-item-link" to={"#"}>
                        <Forum
                            sx={{
                                minWidth: "40px",
                                minHeight: "40px",
                                fontSize: "40px",
                            }}
                            alt="friends icon"
                            color="primary"
                        />
                        <Typography fontSize={15} fontWeight={600}>
                            Messenger
                        </Typography>
                    </Link>
                </ListItem>
            </List>
        </aside>
    );
}

export default HomeAsideLeft;

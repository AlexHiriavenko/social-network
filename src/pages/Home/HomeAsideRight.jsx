import { Typography, List, ListItem, Divider } from "@mui/material";
import ContactsList from "./ContactsList";

function HomeAsideRight() {
    return (
        <aside className="sidebar-home sidebar-home-right">
            <Typography
                id="ad"
                component="h3"
                sx={{
                    pl: 2,
                    mt: 2,
                    color: "rgb(101, 103, 107)",
                    fontWeight: 600,
                    fontSize: "17px",
                }}
            >
                Advertisement
            </Typography>
            <List>
                <ListItem
                    sx={{
                        ":hover": {
                            backgroundColor: "rgb(230, 230, 230)",
                        },
                    }}
                >
                    <a
                        className="sidebar-home__advertisement-link"
                        href="https://dan-it.com.ua/uk/"
                        target="_blank"
                    >
                        <img
                            style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                            }}
                            alt="company logo"
                            src="https://dan-it.com.ua/wp-content/themes/danIT%20v2.0/assets/img/svg/dan-logo.svg"
                            width={100}
                        />
                        <Typography
                            paragraph
                            sx={{
                                fontSize: "15px",
                                lineHeight: "1",
                                m: 0,
                            }}
                        >
                            Master modern IT-profession
                        </Typography>
                    </a>
                </ListItem>
                <ListItem
                    sx={{
                        ":hover": {
                            backgroundColor: "rgb(230, 230, 230)",
                        },
                    }}
                >
                    <a className="sidebar-home__advertisement-link" href="#ad">
                        <img
                            style={{
                                paddingRight: "20px",
                            }}
                            alt="company logo"
                            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/your-company-design-template-72a9e69c34f5b1bd6dcfdf25fd5ce272_screen.jpg?ts=1687067009"
                            width={100}
                        />
                        <Typography
                            paragraph
                            sx={{
                                fontSize: "15px",
                                lineHeight: "1",
                                m: 0,
                            }}
                        >
                            Here can be your advertising
                        </Typography>
                    </a>
                </ListItem>
            </List>
            <Divider />
            <Typography
                component="h3"
                sx={{
                    pl: 2,
                    mt: 2,
                    color: "rgb(101, 103, 107)",
                    fontWeight: 600,
                    fontSize: "17px",
                }}
            >
                Contacts
            </Typography>
            <ContactsList />
        </aside>
    );
}

export default HomeAsideRight;

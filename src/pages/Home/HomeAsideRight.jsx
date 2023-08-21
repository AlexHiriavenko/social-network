import { Typography, List, ListItem, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SvgDanIT from "../../components/SVG/DanIT";
import ContactsList from "./ContactsList";
import UsersList from "../Chats/UsersList/UsersList";

function HomeAsideRight() {
    const theme = useTheme();
    return (
        <aside
            className="sidebar-home sidebar-home-right"
            style={{
                backgroundColor: theme.palette.backgroundColor.page,
                borderLeft: theme.palette.border.transp,
            }}
        >
            <Typography
                id="ad"
                component="h3"
                sx={{
                    pl: 2,
                    mt: 2,
                    color: (theme) => theme.palette.textColor.secondary,
                    fontWeight: 600,
                    fontSize: "17px",
                }}
            >
                Advertisement
            </Typography>
            <List>
                <ListItem
                    sx={{
                        mt: 2,
                        ":hover": {
                            backgroundColor: theme.palette.hoverColor.secondary,
                        },
                    }}
                >
                    <a
                        className="sidebar-home__advertisement-link"
                        href="https://dan-it.com.ua/uk/"
                        target="_blank"
                    >
                        <div
                            style={{
                                paddingTop: "12px",
                                paddingBottom: "12px",
                            }}
                        >
                            <SvgDanIT />
                        </div>
                        <Typography
                            paragraph
                            sx={{
                                fontSize: "15px",
                                lineHeight: "1",
                                m: 0,
                                color: (theme) => theme.palette.textColor.content,
                            }}
                        >
                            Master modern IT-profession
                        </Typography>
                    </a>
                </ListItem>
                <ListItem
                    sx={{
                        mt: 2,
                        ":hover": {
                            backgroundColor: theme.palette.hoverColor.secondary,
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
                                color: (theme) => theme.palette.textColor.content,
                            }}
                        >
                            Here can be your advertising
                        </Typography>
                    </a>
                </ListItem>
            </List>
            {/* <Divider
                sx={{
                    backgroundColor: theme.palette.border.simpleTransp,
                }}
            />
            <Typography
                component="h3"
                sx={{
                    pl: 2,
                    mt: 2,
                    color: theme.palette.textColor.secondary,
                    fontWeight: 600,
                    fontSize: "17px",
                }}>
                Contacts
            </Typography>
            <UsersList /> */}
        </aside>
    );
}

export default HomeAsideRight;

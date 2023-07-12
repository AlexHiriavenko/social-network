import { List, ListItem } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import CheckboxMenu from "./CheckboxMenu/CheckBoxMenu";
import YouTubeVideo from "./Video/Video";
import { mockVideoList } from "./Video/mockVideoList";

function Watch() {
    const videoURL = "https://www.youtube.com/embed/BFTSrbB2wII";

    return (
        <div className="container-page">
            <Sidebar>
                <h2 className="Dialog-message">Watch</h2>
                <CheckboxMenu />
            </Sidebar>
            <main className="main-page-content">
                <h2 className="tempTitle">Watch Page Content</h2>
                <List className="video-list">
                    {mockVideoList.map((video) => {
                        return (
                            <ListItem
                                key={video.url}
                                sx={{ justifyContent: "center", width: "max-content" }}
                            >
                                <YouTubeVideo videoURL={video.url} />
                            </ListItem>
                        );
                    })}
                </List>
            </main>
        </div>
    );
}

export default Watch;

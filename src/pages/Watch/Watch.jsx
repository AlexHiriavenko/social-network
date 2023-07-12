import React from "react";
import LazyLoad from "react-lazyload";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, ListItem } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import CheckboxMenu from "./CheckboxMenu/CheckBoxMenu";
import YouTubeVideo from "./Video/Video";
import { mockVideoList } from "./Video/mockVideoList";

function Watch() {
    const initialItems = 2; // Начальное количество элементов для загрузки
    const loadMoreItems = 2; // Количество элементов для загрузки при прокрутке

    const [visibleItems, setVisibleItems] = React.useState(initialItems);

    const handleLoadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + loadMoreItems);
    };

    const hasMoreItems = visibleItems < mockVideoList.length;

    return (
        <div className="container-page">
            <Sidebar>
                <h2 className="Dialog-message">Watch</h2>
                <CheckboxMenu />
            </Sidebar>
            <main className="main-page-content">
                <h2 className="main-title">
                    What would you like to watch today?
                </h2>
                <div id="lazyWrapper">
                    <InfiniteScroll
                        className="test"
                        dataLength={visibleItems}
                        next={handleLoadMore}
                        hasMore={hasMoreItems}
                        loader={
                            <p className="lazy-load-text">
                                Loading...(scroll down)
                            </p>
                        }
                        endMessage={<p>No more videos to load.</p>}
                        scrollableTarget="lazyWrapper">
                        <LazyLoad
                            height={200}
                            once
                            className="lazyload-wrapper">
                            <List className="video-list">
                                {mockVideoList
                                    .slice(0, visibleItems)
                                    .map((video) => (
                                        <ListItem
                                            key={video.url}
                                            sx={{
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                width: "max-content",
                                            }}>
                                            <YouTubeVideo
                                                videoURL={video.url}
                                                w={video.width}
                                                h={video.height}
                                            />
                                            <div style={{ height: "30px" }}>
                                                {" "}
                                            </div>
                                        </ListItem>
                                    ))}
                            </List>
                        </LazyLoad>
                    </InfiniteScroll>
                </div>
            </main>
        </div>
    );
}

export default Watch;

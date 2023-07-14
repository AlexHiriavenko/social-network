import React, { useState } from "react";
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

  const [visibleItems, setVisibleItems] = useState(initialItems);
  const [originalVideoCategories, setOriginalVideoCategories] =
    useState(mockVideoList);
  const [filteredVideoCategories, setFilteredVideoCategories] =
    useState(mockVideoList);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + loadMoreItems);
  };

  const hasMoreItems = visibleItems < filteredVideoCategories.length;

  const handleFilterCategories = (selectedCategories) => {
    const newVideoCategories = originalVideoCategories.filter((video) =>
      selectedCategories.includes(video.genre)
    );
    setFilteredVideoCategories(newVideoCategories);
    setVisibleItems(initialItems);
  };

  return (
    <div className="container-page">
      <Sidebar>
        <h2 className="Dialog-message">Watch</h2>
        <CheckboxMenu onFilterCategories={handleFilterCategories} />
      </Sidebar>
      <main className="main-page-content">
        <h2 className="main-title">What would you like to watch today?</h2>
        <div id="lazyWrapper">
          <InfiniteScroll
            className="test"
            dataLength={visibleItems}
            next={handleLoadMore}
            hasMore={hasMoreItems}
            scrollableTarget="lazyWrapper">
            <LazyLoad height={200} once className="lazyload-wrapper">
              <List className="video-list">
                {filteredVideoCategories.slice(0, visibleItems).map((video) => (
                  <ListItem
                    key={video.url}
                    sx={{
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "max-content",
                    }}>
                    <YouTubeVideo videoURL={video.url} />
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

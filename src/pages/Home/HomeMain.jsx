import { useSelector } from "react-redux";
import PostList from "../../components/Posts/Post/PostList";
import { useEffect, useState } from "react";
import CreatePost from "../../components/Posts/CreatePost";
import { getPageblePosts, setVisiblePosts } from "../../redux/post.slice/post.slice.js";
import { useDispatch } from "react-redux";

function HomeMain() {
  // State
  const [mainPagePosts, setMainPagePosts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  // Constants
  const visiblePosts = useSelector((state) => state.post.visiblePosts);
  const dispatch = useDispatch();
  // Functions
  function handleScroll(e) {
    if (
      e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight)<250
    ) {
      setFetching(true);
    }
  }
  //   useEffect
  useEffect(() => {
    if (fetching) {
      dispatch(getPageblePosts({ page: currentPage, size: 6 }))
        .then((data) => {
          setCurrentPage(currentPage + 1);
          setMainPagePosts([...mainPagePosts, ...data.payload]);
          dispatch(setVisiblePosts([...mainPagePosts, ...data.payload]));
        })
        .catch((error) => console.log(error))
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    setMainPagePosts(visiblePosts);
  }, [visiblePosts]);
  return (
    <main className="main-home-content" onScroll={handleScroll}>
      <CreatePost />
      <PostList posts={visiblePosts} />
    </main>
  );
}

export default HomeMain;

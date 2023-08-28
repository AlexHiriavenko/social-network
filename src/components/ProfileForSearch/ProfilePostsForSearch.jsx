import ProfileIntroForSearch from "./ProfileIntroForSearch.jsx"
import ProfilePostsPhotosForSearch from "./ProfilePostsPhotosForSearch.jsx";
import ProfilePostsFriendsForSearch from "./ProfilePostFriendsForSearch.jsx";
import { useEffect, useRef, useState } from "react";
import CreatePost from "../Posts/CreatePost";
import PostListForSearch from "./PostListForSearch.jsx"
import styled from "@emotion/styled";
import { ProfileContainer } from "../UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    getPostsByUserId,
    setUserPosts,
    setVisiblePosts,
} from "../../redux/post.slice/post.slice.js";
import {useParams} from "react-router-dom";

const StyledPostsContainer = styled(ProfileContainer)({
    maxWidth: "1095px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "16px",
    paddingRight: "16px",
    display: "grid",
    alignItems: "start",
    gap: "15px",
    " @media (min-width: 925px)": {
        gridTemplateColumns: "1fr 1.5fr",
    },
});
const StyledPostsPage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.backgroundColor.page,
    paddingTop: "20px",
}));

const StyledPostsLeftSide = styled(Box)({
    display: "flex",
    flexDirection: "column",
    rowGap: "11px",
    paddingBottom: "20px",
});

const StyledPostsPublications = styled(Box)({
    display: "flex",
    flexDirection: "column",
    rowGap: "11px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
        width: "0",
    },
});
export default function ProfilePostsForSearch() {
    // Costants
    const dispatch = useDispatch();
    const userInfoRef = useRef(null);
    const allUserPosts = useSelector((state) => state.post.allUserPosts);
    const visiblePosts = useSelector((state) => state.post.visiblePosts);
    // State
    const [userInfoHeight, setUserInfoHeight] = useState(0);

    let {id} = useParams();
    // UseEffect
    useEffect(() => {
        const copyPosts = allUserPosts?.length > 0 ? [...allUserPosts] : [];
        copyPosts.reverse();
        dispatch(setVisiblePosts(copyPosts));
        // setReversePosts(copyPosts);
    }, [allUserPosts]);
    useEffect(() => {
        setTimeout(() => {
            if (userInfoRef.current !== null) {
                setUserInfoHeight(userInfoRef.current.getBoundingClientRect().height);
            }
        }, 500);
    }, [userInfoRef.current]);
    useEffect(() => {

        const userPostsResponse = dispatch(getPostsByUserId(id));
        userPostsResponse
            .then((data) => dispatch(setUserPosts(data.payload)))
            .catch((error) => console.error(error.message));
    }, [id]);
    return (
        <StyledPostsPage>
            <StyledPostsContainer>
                <StyledPostsLeftSide ref={userInfoRef}>
                    <ProfileIntroForSearch id={id} />

                    <ProfilePostsPhotosForSearch id={id} />
                    <ProfilePostsFriendsForSearch  id ={id}/>
                </StyledPostsLeftSide>
                <StyledPostsPublications
                    style={{
                        maxHeight: userInfoHeight + "px",
                    }}
                >

                    <PostListForSearch posts={visiblePosts} />
                </StyledPostsPublications>
            </StyledPostsContainer>
        </StyledPostsPage>
    );
}

import styled from "@emotion/styled";
import Post from "../Posts/Post/Post.jsx";
import { useEffect, useState } from "react";
const StyledPostsList = styled("ul")({
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
});
export default function PostListForSearch({ posts }) {
    if (posts.length === 0) return;
    return (
        <StyledPostsList>
            {posts?.map((post, index) => {
                if (post.postType == "post") return <Post {...post} key={index} />;
            })}
        </StyledPostsList>
    );
}

PostList.defaultProps = {
    posts: [],
};

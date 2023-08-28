import { useEffect, useRef, useState } from "react";
import {
    ContentBlock,
    ContentBlockHeader,
    ContentBlockLink,
    ContentBlockList,
    ContentBlockTitel,
} from "../UserProfile/StyledComponents/ContentBlock/StyledComponents.js";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriends,
    getUser,
    setFriends,
    setUser,
} from "../../redux/user.slice/user.slice.js";

const StyledPostFriendsSubtitle = styled(Typography)(({ theme }) => ({
    width: "100%",
    color: theme.palette.textColor.secondary,
    paddingLeft: "16px",
}));

const StyledPostFriendsList = styled(ContentBlockList)({
    gap: "11px",
});

const StyledPostFriendItem = styled(Box)({
    cursor: "pointer",
    "&:hover img": {
        transform: "scale(0.98)",
    },
});
const StyledPostFriendImage = styled("img")({
    objectFit: "cover",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "204px",
    transitionDuration: "500ms",
});
const StyledPostFriendName = styled(Typography)(({ theme }) => ({
    color: theme.palette.textColor.main,
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "sans-serif",
}));
export default function ProfilePostsFriendsForSearch(props) {
    // Constants
    const photosRef = useRef(null);
    const authUser = useSelector((state) => state.user.authorizedUser);
    const [userFriends,setUserFriends] = useState([])
    const dispatch = useDispatch();

     let id = props.id
    // State
    const [photoHeight, setPhotoHeight] = useState(204);
    const [acceptedFriends, setAcceptedFriends] = useState([]);
    useEffect(() => {

        (async() => {
            let friends = await  dispatch(getFriends(id))
            console.log(friends.payload)
            if (friends.payload) {

                setUserFriends(friends.payload)
            }

        })()
    }, [id]);

    // Photo size
    useEffect(() => {
        window.addEventListener("resize", resizePhotoHeigh);
        return function () {
            window.removeEventListener("resize", resizePhotoHeigh);
        };
    }, [photosRef]);
    useEffect(() => {
        if (photosRef.current) setPhotoHeight(photosRef.current.width);
    }, [photosRef.current]);

    // Functions
    function resizePhotoHeigh() {
        if (photosRef.current) setPhotoHeight(photosRef.current.width);
    }

    function lookFriendPage(friend) {
        // get user friends
        const userFriendsResponse = dispatch(getFriends(friend.id));
        userFriendsResponse
            .then((data) => {
                dispatch(setFriends(data.payload));
                localStorage.setItem("friends", JSON.stringify(data.payload));
            })
            .catch((error) => console.log(error.message));

        if (friend.id === authUser.id) {
            dispatch(setUser(authUser));
            localStorage.setItem("user", JSON.stringify(authUser));
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const lookedFriend = dispatch(getUser(friend.id));
            lookedFriend
                .then((data) => {
                    dispatch(setUser(data.payload));
                    localStorage.setItem("user", JSON.stringify(data.payload));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                })
                .catch((error) => console.log(error.message));
        }
    }
    // UseEffect
    useEffect(() => {
        const acceptedFriendsArray = userFriends.filter(
            (friendItem) => friendItem?.status === "accepted"
        );
        setAcceptedFriends(acceptedFriendsArray);
    }, [userFriends]);
    return (
        <ContentBlock style={{ maxWidth: "680px" }}>
            <ContentBlockHeader>
                <ContentBlockTitel>Friends</ContentBlockTitel>
                <ContentBlockLink to={`/search/${id}/friends`}>
                    See all friends
                </ContentBlockLink>
            </ContentBlockHeader>
            <StyledPostFriendsSubtitle>
                {acceptedFriends.length} friends
            </StyledPostFriendsSubtitle>
            <StyledPostFriendsList>
                {acceptedFriends.map((friend, index) => {
                    return (
                        <  Link    key={index}
                            to={`/search/${friend.friend.id}`}

                          >
                        <StyledPostFriendItem
                            key={index}
                            onClick={() => {
                                lookFriendPage(friend.friend)

                            }}
                        >
                            <StyledPostFriendImage
                                src={
                                    friend.friend.profilePicture ||
                                    "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                                }
                                alt="foto"
                                width={204}
                                height={photoHeight}
                                ref={photosRef}
                            />
                            <StyledPostFriendName>
                                {friend.friend.fullName}
                            </StyledPostFriendName>
                        </StyledPostFriendItem>
                        </Link>
                    );
                })}
            </StyledPostFriendsList>

        </ContentBlock>
    );
}

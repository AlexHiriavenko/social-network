import styled from "@emotion/styled";
import { useParams} from "react-router-dom";
import FriendsListForSearch from "./FriendListForSearch.jsx";
import { Box } from "@mui/material";
import { ProfileContainer } from "../UserProfile/StyledComponents/ContentBlock/StyledComponents.js";

const StyledFriendsPage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.backgroundColor.page,
    paddingTop: "20px",
    paddingBottom: "20px",
}));

export default function ProfileFriendsForSearch() {

    let {id} = useParams();
    return (
        <StyledFriendsPage>
            <ProfileContainer>
                <FriendsListForSearch id = {id} />
            </ProfileContainer>
        </StyledFriendsPage>
    );
}

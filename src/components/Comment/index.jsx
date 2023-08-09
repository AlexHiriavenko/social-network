import styled from "@emotion/styled";
import { BlockUserImage } from "../UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { Typography } from "@mui/material";

const StyledCommentWrraper = styled("div")(({ theme }) => ({
    display: "flex",
    gap: "10px",
}));

const StyledCommentContent = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.input.mainBackground,
    padding: "8px 12px",
    borderRadius: "18px",
}));

const StyledPostDate = styled(Typography)(({ theme }) => ({
    fontSize: "12px",
    color: theme.palette.textColor.secondary,
}));

const StyledCommentName = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
}));

const StyledCommentText = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.textColor.main,
}));

export default function Comment(props) {
    const { user, content, createdDate, id, likes } = props;

    function getPostDate(postDate) {
        const date = new Date(postDate);
        let month;

        switch (date.getMonth()) {
            case 0:
                month = "Jan";
                break;
            case 1:
                month = "Feb";
                break;
            case 2:
                month = "Mar";
                break;
            case 3:
                month = "Apr";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "Jun";
                break;
            case 6:
                month = "Jul";
                break;
            case 7:
                month = "Aug";
                break;
            case 8:
                month = "Sep";
                break;
            case 9:
                month = "Oct";
                break;
            case 10:
                month = "Nov";
                break;
            case 11:
                month = "Dec";
                break;
            default:
                month = "Invalid month number";
        }

        return month + " " + date.getDate();
    }

    return (
        <StyledCommentWrraper>
            <BlockUserImage src={
                user?.profilePicture ||
                "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
            }
                alt=""
                width={40}
                height={40} />
            <StyledCommentContent>
                <StyledPostDate>{getPostDate(createdDate)}</StyledPostDate>
                <StyledCommentName>
                    {user?.fullName}
                </StyledCommentName>
                <StyledCommentText>
                    {content}
                </StyledCommentText>
            </StyledCommentContent>
        </StyledCommentWrraper>
    );
}

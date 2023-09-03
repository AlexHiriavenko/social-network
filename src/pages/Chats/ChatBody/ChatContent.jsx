import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { List, ListItem, Typography, Box, Avatar, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { setMessageContent, setMessageId } from "../../../redux/message.slice/message.slice";
import {
    openDeleteMessageModal,
    openEditMessageModal,
} from "../../../redux/modal.slice/modal.slice";
import { StyledMessageBtnGroup, WrapMessage } from "../styledChatComponents";

function ChatContent() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { messages } = useSelector((state) => state.chat.currentChat);

    const sortedMessages =
        messages.length > 1
            ? messages.toSorted((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
            : messages;

    const authUser = useSelector((state) => state.user.authorizedUser);
    const authUserId = authUser.id;

    const isAuthUser = (authUserId, userId) => authUserId === userId;

    const handleOpenDelete = (event, messageId) => {
        dispatch(setMessageId(messageId));
        dispatch(openDeleteMessageModal());
    };

    const handleOpenEdit = (event, messageId, messageContent) => {
        dispatch(setMessageId(messageId));
        dispatch(setMessageContent(messageContent));
        dispatch(openEditMessageModal());
    };

    return (
        <List className="chat-body__list">
            {sortedMessages.map((message, index) => (
                <ListItem
                    p={0}
                    className={
                        isAuthUser(authUserId, message.sender.id)
                            ? "chat-body__item--authUser"
                            : "chat-body__item--chatPartner"
                    }
                    key={index}
                >
                    <Typography color={theme.palette.textColor.secondary} align="left">
                        {message.createdDate
                            ? new Date(message.createdDate).toLocaleString()
                            : "unknown date"}
                    </Typography>
                    <WrapMessage>
                        {" "}
                        <Tooltip title={message.sender.fullName}>
                            <Avatar
                                sx={{ minWidth: "40px", minHeight: "40px" }}
                                alt="user icon"
                                src={message.sender.profilePicture}
                            ></Avatar>
                        </Tooltip>
                        <Box
                            id={"message" + message.id}
                            className="wrap-btns"
                            sx={{ display: "flex", gap: 1 }}
                        >
                            <Typography
                                className={
                                    isAuthUser(authUserId, message.sender.id)
                                        ? "message-text-authUser"
                                        : "messege-text-chatPartner"
                                }
                                sx={{
                                    p: 2,
                                    minWidth: "200px",
                                    maxWidth: "300px",
                                    borderRadius: "16px",
                                }}
                            >
                                {message.content ? message.content : ""}
                            </Typography>
                            {isAuthUser(authUserId, message.sender.id) ? (
                                <StyledMessageBtnGroup>
                                    <EditIcon
                                        onClick={(event) =>
                                            handleOpenEdit(event, message.id, message.content)
                                        }
                                        color="primary"
                                        sx={{
                                            minWidth: "24px",
                                            minHeight: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
                                    <DeleteOutlineIcon
                                        onClick={(event) => handleOpenDelete(event, message.id)}
                                        color="primary"
                                        sx={{
                                            minWidth: "24px",
                                            minHeight: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </StyledMessageBtnGroup>
                            ) : null}
                        </Box>
                    </WrapMessage>
                </ListItem>
            ))}
        </List>
    );
}

export default ChatContent;

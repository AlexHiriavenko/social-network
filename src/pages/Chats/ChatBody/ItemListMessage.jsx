import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { ListItem, Typography, Avatar, Tooltip } from "@mui/material";
import {
    setMessageContent,
    setMessageId,
} from "../../../redux/message.slice/message.slice";
import {
    openDeleteMessageModal,
    openEditMessageModal,
} from "../../../redux/modal.slice/modal.slice";
import { StyledMessageBtnGroup } from "../styledChatComponents";
import {
    BtnDeleteMessage,
    BtnEditMessage,
    WrapMessage,
    WrapBns,
    PartnerUserMessage,
    AuthUserMessage,
    ContainerMessageImgs,
} from "./StyledChatBody";

function ItemListMessage({ message }) {
    const dispatch = useDispatch();
    const theme = useTheme();

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
        <ListItem
            className={
                isAuthUser(authUserId, message.sender.id)
                    ? "chat-body__item--authUser"
                    : "chat-body__item--chatPartner"
            }>
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
                        src={message.sender.profilePicture}></Avatar>
                </Tooltip>
                <WrapBns id={"message" + message.id}>
                    {isAuthUser(authUserId, message.sender.id) ? (
                        message.content ? (
                            <AuthUserMessage>{message.content}</AuthUserMessage>
                        ) : null
                    ) : message.content ? (
                        <PartnerUserMessage>
                            {message.content}
                        </PartnerUserMessage>
                    ) : null}
                    {isAuthUser(authUserId, message.sender.id) ? (
                        <StyledMessageBtnGroup
                            sx={{
                                flexDirection: message.content
                                    ? "column"
                                    : "row",
                            }}>
                            <BtnEditMessage
                                onClick={(event) =>
                                    handleOpenEdit(
                                        event,
                                        message.id,
                                        message.content
                                    )
                                }
                            />
                            <BtnDeleteMessage
                                onClick={(event) =>
                                    handleOpenDelete(event, message.id)
                                }
                            />
                        </StyledMessageBtnGroup>
                    ) : null}
                </WrapBns>
            </WrapMessage>
            <ContainerMessageImgs>
                {message.imageUrls?.length
                    ? message.imageUrls.map((url, index) => (
                          <img
                              src={url.imgUrl}
                              key={index}
                              style={{ height: "200px", maxWidth: "90%" }}
                          />
                      ))
                    : null}
            </ContainerMessageImgs>
        </ListItem>
    );
}

export default ItemListMessage;

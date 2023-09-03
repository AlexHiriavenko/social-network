import { Typography, Box, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteTemporaryParticipant } from "../../../../../redux/chat.slice/chat.slice";
import { AvatarStyled, ContainerFlexSB } from "../../headerOptionsStyled";

function NewChatHead({ setNewMessageModal }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    function handleClose() {
        setNewMessageModal(false);
        dispatch(deleteTemporaryParticipant());
    }

    return (
        <ContainerFlexSB>
            <Typography
                variant="h5"
                component={"h4"}
                fontWeight={600}
                color={theme.palette.textColor.content}
            >
                New Chat with...
            </Typography>
            <AvatarStyled onClick={handleClose}>
                <CloseIcon
                    sx={{
                        color: theme.palette.textColor.content,
                    }}
                />
            </AvatarStyled>
        </ContainerFlexSB>
    );
}

export default NewChatHead;

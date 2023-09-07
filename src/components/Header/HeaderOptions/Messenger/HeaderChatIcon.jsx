import { IconButton, Tooltip, Badge } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { useTheme } from "@mui/material/styles";
import { AvatarStyled } from "../headerOptionsStyled";

function HeaderChatIcon(props) {
    const { toggleMenu } = props;
    const theme = useTheme();

    return (
        <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
            <IconButton onClick={toggleMenu} sx={({ py: 1 }, { px: { xs: 0.5, sm: 1 } })}>
                <Badge badgeContent={4} color="secondary">
                    <AvatarStyled>
                        <ForumIcon style={{ color: theme.palette.textColor.content }} />
                    </AvatarStyled>
                </Badge>
            </IconButton>
        </Tooltip>
    );
}

export default HeaderChatIcon;

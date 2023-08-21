import { IconButton, Avatar, Tooltip, Badge } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { useTheme } from "@mui/material/styles";

function HeaderChatIcon(props) {
    const { toggleMenu } = props;
    const theme = useTheme();

    return (
        <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
            <IconButton
                onClick={toggleMenu}
                sx={({ pt: 1, pb: 1 }, { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })}
            >
                <Badge badgeContent={4} color="secondary">
                    <Avatar
                        sx={{
                            bgcolor: theme.palette.hoverColor.dark,
                            minWidth: "40px",
                            minHeight: "40px",
                        }}
                    >
                        <ForumIcon style={{ color: theme.palette.textColor.content }} />
                    </Avatar>
                </Badge>
            </IconButton>
        </Tooltip>
    );
}

export default HeaderChatIcon;

import s from "./sidebar.module.scss";
import { useTheme } from "@mui/material/styles";

function Sidebar(props) {
    const theme = useTheme();
    return (
        <aside
            className={s["page-sidebar"]}
            style={{
                backgroundColor: theme.palette.backgroundColor.section,
                borderRight: theme.palette.border.transp,
            }}
        >
            {props.children}
        </aside>
    );
}

export default Sidebar;

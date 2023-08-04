import { useTheme } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar/Sidebar";

function Chats() {
    const theme = useTheme();
    return (
        <div
            className="container-page"
            style={{ backgroundColor: theme.palette.backgroundColor.page }}>
            <Sidebar>
                <p className="Dialog-message">Sidebar content</p>
            </Sidebar>
            <main className="main-page-content">
                <h2 className="main-title">Chats</h2>
            </main>
        </div>
    );
}

export default Chats;

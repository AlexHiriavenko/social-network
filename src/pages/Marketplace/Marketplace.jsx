import Sidebar from "../../components/Sidebar/Sidebar";
import { useTheme } from "@mui/material/styles";

function Marketplace() {
    const theme = useTheme();
    return (
        <div
            className="container-page"
            style={{ backgroundColor: theme.palette.backgroundColor.page }}
        >
            <Sidebar>
                <p className="Dialog-message">Sidebar content</p>
            </Sidebar>
            <main className="main-page-content">
                <h2 className="main-title">Marketplace Page Content</h2>
            </main>
        </div>
    );
}

export default Marketplace;

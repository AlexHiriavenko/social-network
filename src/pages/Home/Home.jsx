import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import { useTheme } from "@mui/material/styles";

function Home() {
    const theme = useTheme();
    return (
        <div
            className="container-page"
            style={{ backgroundColor: theme.palette.backgroundColor.page }}
        >
            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
    );
}

export default Home;

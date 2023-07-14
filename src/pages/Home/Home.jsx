import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";

function Home() {
    return (
        <div className="container-page">
            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
    );
}

export default Home;

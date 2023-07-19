import Sidebar from "../../components/Sidebar/Sidebar";

function Marketplace() {
    return (
        <div className="container-page">
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

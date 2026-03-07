import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NeonParticles from "../components/NeonParticles";
import FireCursor from "../components/FireCursor";

const Root = () => {
    return (
        <div className="relative">
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <NeonParticles count={45} />
            </div>

            <Navbar></Navbar>
            <div className="min-h-screen relative z-10">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <FireCursor />
        </div>
    );
};

export default Root;

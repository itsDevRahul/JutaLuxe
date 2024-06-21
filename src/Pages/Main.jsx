import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Cart from "../Components/Cart";
import { ContextProvider } from "../MainContext";

export default function Main() {
    return (
        <ContextProvider>
            <div className="relative">
                <Header />
                <Cart />
                <Outlet />
                <Footer />
            </div>
        </ContextProvider>
    )
}
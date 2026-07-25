
import Login from "./page";
import Navbar from "@/Home/NavBar";
import Footer from "@/Home/Footer";
export default function LoginLayout({children}: {children: React.ReactNode}) {
    return(
        <>
        <Navbar/>
       {children}
        <Footer/>
        </>
        
    );
}

import Login from "./page";
import Navbar from "@/components/pages/Home/NavBar";
import Footer from "@/components/pages/Home/Footer";
export default function RegisterLayout({children}: {children: React.ReactNode}) {
    return(
        <>
        <Navbar/>
       {children}
        <Footer/>
        </>
        
    );
}
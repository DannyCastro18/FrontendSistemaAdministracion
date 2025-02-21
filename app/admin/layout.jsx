import NavbarAdmin from "../components/Navbar"; 
import Header from '../components/Header';
export default function Layout({ children }) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <section className="flex w-full">
            <NavbarAdmin />
            {children}
        </section>
      </div>
    );
  }
  
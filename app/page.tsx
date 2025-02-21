import NavbarAdmin from "./components/Navbar";
import AddButton from "./components/AddButton";
import Header from "./components/Header";
import TableOwner from "./components/TableOwner";
import TableApartament from "./components/TableProperties.jsx";
import TablePayments from "./components/TablePayments";
import TableGuard from "./components/TableGuard";

export default function dashboard() {
  return (
    <div className="">
      <Header />
      <NavbarAdmin />
      <AddButton />
      
      <TableOwner/>
      <TableApartament/>
      <TablePayments/>
      <TableGuard/>
    </div>
  );
}

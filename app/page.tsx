import NavbarAdmin from "./components/Navbar";
import AddButton from "./components/AddButton";
import TableOwner from "./components/TableOwner";
import TableApartament from "./components/TableApartament";
import TablePayments from "./components/TablePayments";
import TableGuard from "./components/TableGuard";

export default function dashboard() {
  return (
    <div className="">
      <NavbarAdmin />
      <AddButton />
      <TableOwner/>
      <TableApartament/>
      <TablePayments/>
      <TableGuard/>
    </div>
  );
}

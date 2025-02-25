import NavbarAdmin from "./components/Navbar";
import Header from "./components/Header";
import TableOwner from "./components/TableOwner";

import TablePayments from "./components/TablePayments";
import TableGuard from "./components/TableGuard";

export default function dashboard() {
  return (
    <div className="">
      <Header />
      <NavbarAdmin />
      
      <TableOwner/>
      <TablePayments/>
      <TableGuard/>
    </div>
  );
}

import NavbarAdmin from "./components/Navbar";
import BotonAgregar from "./components/BotonAgregar";
import Header from "./components/Header";
import TableOwner from "./components/TableOwner";

export default function dashboard() {
  return (
    <div className="">
      <Header />
      <NavbarAdmin />
      <BotonAgregar />
      <TableOwner/>
    </div>
  );
}

import NavbarAdmin from "./components/Navbar";
import BotonAgregar from "./components/BotonAgregar";
import TableOwner from "./components/TableOwner";

export default function dashboard() {
  return (
    <div className="">
      <NavbarAdmin />
      <BotonAgregar />
      <TableOwner/>
    </div>
  );
}

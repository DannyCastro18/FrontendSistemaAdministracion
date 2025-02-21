import TableAdmin from "@/app/components/TableAdmin";
import AddButton from "@/app/components/AddButton";
export default function DashboardPage() {
    return (
        <div className='flex flex-col w-full h-full'>
            <TableAdmin />
            <AddButton/>
        </div>
    );
}
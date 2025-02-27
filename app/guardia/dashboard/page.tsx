import TableGuard from "@/app/components/TableGuard";
export default function DashboardPageGuard() {
    return (
        <div className='flex flex-col w-full h-full'>
            <TableGuard />
        </div>
    );
}
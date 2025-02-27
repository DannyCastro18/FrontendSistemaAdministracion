import Link from 'next/link';

function Header() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        router.push("/login"); 
    };
    return (
        <header className='w-full h-32 flex justify-between items-center p-4 font-fredoka bg-black'>
            <figure className='flex h-full items-center w-auto'>
                <img className='h-full' src="/img/logitoSol-sin-fondo.png" alt="Logo del conjunto residencial" />
                <h1 className='flex w-30 text-white font-medium text-5xl'>Villa del Sol</h1>
            </figure>
            <ul>
                <li>
                    <Link h">
                    <svg className='w-10 h-10' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12h-9.5m7.5 3l3-3l-3-3m-5-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1"/></svg>
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
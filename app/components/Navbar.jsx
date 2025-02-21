import Link from 'next/link';

const NavbarAdmin = () => {

    return (
            <nav className='flex flex-col justify-bettween items-center rounded-full group-hover:items-baseline group-hover:pl-4 w-16 py-8 bg-black  mr-3 p-1.5 h-full justify-center'>
                <ul className='flex gap-2 flex-col justify-center items-center py-2'>
                    <li className='w-fit h-12 flex hover:bg-yellow-500 rounded justify-center items-center group-hover:w-full gap-4'>
                        <Link href={'/admin/dashboard'}>
                            <svg className="w-10 h-10 text-yellow-300 dark:text-white hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd" />
                            </svg>
                        </Link>

                    </li>

                    <li className='w-fit h-12 flex hover:bg-yellow-500 rounded justify-center items-center group-hover:w-full gap-4'>
                        <Link href={'/admin/owners'}>
                            <svg xmlns="http://www.w3.org/2000/svg hover:text-black" width="40" height="40" viewBox="0 0 24 24">
                                <path  className="fill-white hover:fill-black" d="M12 6a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m-1.5 8a4 4 0 0 0-4 4a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2a4 4 0 0 0-4-4zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293a3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2a4 4 0 0 0-4-4h-1.1a5.5 5.5 0 0 1-.471.762A6 6 0 0 1 19.5 18M4 7.5a3.5 3.5 0 0 1 5.477-2.889a5.5 5.5 0 0 0-2.796 6.293A3.5 3.5 0 0 1 4 7.5M7.1 12H6a4 4 0 0 0-4 4a2 2 0 0 0 2 2h.5a6 6 0 0 1 3.071-5.238A5.5 5.5 0 0 1 7.1 12" clipRule="evenodd" />
                            </svg>
                        </Link>

                    </li>

                    <li className='w-fit h-12 flex hover:bg-yellow-500 rounded justify-center items-center group-hover:w-full gap-4'>
                        <Link href={'/admin/properties'}>
                            <svg xmlns="http://www.w3.org/2000/svg "width="40" height="40" viewBox="0 0 24 24">
                                <path className="fill-white hover:fill-black " d="M3.5 2A1.5 1.5 0 0 0 2 3.5v13A1.5 1.5 0 0 0 3.5 18H9v-3.316c0-.763.316-1.49.874-2.01L14 8.821V8.5A1.5 1.5 0 0 0 12.5 7H11V3.5A1.5 1.5 0 0 0 9.5 2zM6 5.75a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0M5.25 9.5a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5M6 11.75a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0M7.75 6.5a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5m.75 2.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-.75 3.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5m9.444-3.061a1.75 1.75 0 0 0-2.388 0l-4.25 3.966a1.75 1.75 0 0 0-.556 1.28V20.5a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5V18h2v2.5a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-5.815a1.75 1.75 0 0 0-.556-1.28zm-1.365 1.096a.25.25 0 0 1 .342 0l4.25 3.967a.25.25 0 0 1 .079.183V20.5h-2V18a1.5 1.5 0 0 0-1.5-1.5h-2a1.5 1.5 0 0 0-1.5 1.5v2.5h-2v-5.815a.25.25 0 0 1 .08-.183zM9.25 2h-5.5Z" />
                            </svg>
                        </Link>
                    </li>

                    <li className='w-fit h-12 flex hover:bg-yellow-500 rounded justify-center items-center group-hover:w-full gap-4'>
                        <Link href={'/admin/payments'}>
                            <svg className="w-10 h-10 text-yellow-300 dark:text-white hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clipRule="evenodd" />
                                <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                            </svg>

                        </Link>
                    </li>
                </ul>
            </nav>
    )
}

export default NavbarAdmin;
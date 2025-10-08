'use client'
import { useEffect, useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useParams, usePathname, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import { PiPathFill } from "react-icons/pi";


export default function Header() {
    const slug = usePathname().split('/')[1].replaceAll('-', ' ')
    const dispatch = useDispatch()
    console.log(slug)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const token = useSelector((store) => store.loginStore.token)

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            iconColor: 'black',
            showCancelButton: true,
            color: 'black',
            background: 'white',
            confirmButtonColor: 'black',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, logout'
        });

        if (result.isConfirmed) {
            // Remove token from localStorage
            dispatch(logoutUser())
            // Show logout success message
            await Swal.fire({
                title: 'Logged Out',
                text: 'You have been successfully logged out.',
                icon: 'success',
                iconColor: 'black',

                color: 'black',
                timer: 1500,
                showConfirmButton: true,
                confirmButtonColor: 'black',
            });

            // Redirect to login
            router.push('/');
        }
    }

    // without login can't access dashboard logic
    useEffect(() => {
        if (!token) {
            router.push('/'); // Redirect to login or homepage
        }
    }, [token]);

    const goToProfile = () => {
        router.push('/admin/profile');
    };

    return (
        <header className="px-10 z-[100] py-5 sticky top-0 shadow-lg bg-black text-white flex justify-between items-center">
            {/* Left: Title */}
            <h3 className="flex items-center gap-[6px] text-[25px] capitalize font-bold text-white">
                <PiPathFill className="text-white" />
                {slug}
            </h3>

            {/* Right: Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 hover:text-blue-600 cursor-pointer focus:outline-none"
                >
                    <FaUserCircle className="text-3xl text-white" />
                    <span className="hidden md:inline text-white font-medium">Inframe Design</span>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-2xl shadow-black z-10">
                        <button
                            onClick={goToProfile}
                            className="block w-full cursor-pointer text-left px-4 py-3 text-sm text-gray-950 hover:bg-gray-100  rounded-t-md"
                        >
                            Go to Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block w-full cursor-pointer text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100  rounded-b-md"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

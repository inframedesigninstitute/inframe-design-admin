import Header from "../common/Header";
import SideBar from "../common/SideBar";

export default function User() {
    const users = [
        { id: 1, username: "john_doe", phone: "+91-9876543210", address: "123, MG Road, Mumbai" },
        { id: 2, username: "jane_smith", phone: "+91-9123456789", address: "45, Park Street, Kolkata" },
        { id: 3, username: "rahul_k", phone: "+91-9988776655", address: "89, Brigade Road, Bangalore" },
        { id: 4, username: "alice_w", phone: "+91-9123001122", address: "12, Marine Drive, Mumbai" },
        { id: 5, username: "bob_m", phone: "+91-9988123456", address: "56, Park Avenue, Chennai" },
        { id: 6, username: "charlie_x", phone: "+91-9876543289", address: "78, Salt Lake, Kolkata" },
        { id: 7, username: "diana_p", phone: "+91-9100123456", address: "34, MG Road, Pune" },
        { id: 8, username: "eric_t", phone: "+91-9988771234", address: "90, Residency Road, Bangalore" },
        { id: 9, username: "fiona_r", phone: "+91-9876512345", address: "23, Banjara Hills, Hyderabad" },
        { id: 10, username: "george_k", phone: "+91-9123450987", address: "11, Anna Nagar, Chennai" },
        { id: 11, username: "hannah_s", phone: "+91-9999888777", address: "55, Indiranagar, Bangalore" },
        { id: 12, username: "ian_v", phone: "+91-9876501234", address: "67, Jubilee Hills, Hyderabad" },
        { id: 13, username: "julia_m", phone: "+91-9123456780", address: "42, MG Road, Delhi" },
        { id: 14, username: "kevin_l", phone: "+91-9988776655", address: "88, Park Street, Kolkata" },
        { id: 15, username: "lisa_n", phone: "+91-9876543211", address: "99, Marine Drive, Mumbai" },
    ];


    return (
        <div className="grid grid-cols-[30%_auto] ">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}

            <div>
                <Header />

                <main className="flex-1 px-10 py-3 h-[90vh] overflow-y-scroll ">
                    {/* Header */}
                    <header className="mb-8 ">
                        <h1 className="text-[40px] font-bold text-gray-800">View User</h1>
                    </header>

                    {/* User Table */}
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Sr. No
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Username
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        User Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.address}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

        </div>
    );
}

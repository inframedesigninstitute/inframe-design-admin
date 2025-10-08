'use client'
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import { FaUsers, FaChartBar, FaClock, FaSignOutAlt } from "react-icons/fa";


export default function Dashboard() {





    return (
        <div className="grid grid-cols-[30%_auto] ">
            <SideBar />

            <div>
                <Header />
                <main className="p-10 grid grid-cols-1 h-[90vh] overflow-y-scroll md:grid-cols-2 xl:grid-cols-2 gap-8">

                    {/* Total Users */}
                    <Card
                        title="Total Users"
                        subtitle="Active registegray users this month"
                        value="2,578"
                        trend="+4.5%"
                        trendColor="gray"
                        icon={<FaUsers className="text-white text-xl" />}
                        iconBg="bg-gray-950"
                        color="gray"
                    >
                        <div className="mt-4">
                            <p className="text-sm text-gray-950 mb-2">Top States:</p>
                            <div className="space-y-2">
                                <ProgressBar label="Rajasthan" percent={70} />
                                <ProgressBar label="Jodhpur" percent={50} indent />
                                <ProgressBar label="Jaipur" percent={60} indent />
                                <ProgressBar label="Bikaner" percent={40} indent />
                                <ProgressBar label="Other States" percent={30} />
                            </div>
                            <button className="mt-4 text-sm text-gray-950 hover:underline">
                                View full user report →
                            </button>
                        </div>
                    </Card>

                    {/* Page Views */}
                    <Card
                        title="Page Views"
                        subtitle="Site visits from users"
                        value="18,420"
                        trend="+12.8%"
                        trendColor="gray"
                        icon={<FaChartBar className="text-white text-xl" />}
                        iconBg="bg-gray-950"
                        color="gray"
                    >
                        <div className="mt-4 text-sm text-gray-950">
                            Most views on: <span className="font-semibold text-gray-700">Monday</span><br />
                            Avg Views/day: <span className="font-semibold text-gray-700">2,631</span>
                        </div>
                        <button className="mt-4 text-sm text-gray-950 hover:underline">
                            View traffic analytics →
                        </button>
                    </Card>

                    {/* Bounce Rate */}
                    <Card
                        title="Bounce Rate"
                        subtitle="Percentage of single-page sessions"
                        value="42%"
                        trend="-3.1%"
                        trendColor="gray"
                        icon={<FaSignOutAlt className="text-white text-xl" />}
                        iconBg="bg-gray-950"
                        color="gray"
                    >
                        <div className="mt-4 text-sm text-gray-950">
                            Industry avg: <span className="font-semibold text-gray-700">55%</span><br />
                            Mobile bounce: <span className="font-semibold text-gray-700">39%</span>
                        </div>
                        <button className="mt-4 text-sm text-gray-950 hover:underline">
                            Improve bounce rate →
                        </button>
                    </Card>

                    {/* Avg Session Duration */}
                    <Card
                        title="Avg Session Duration"
                        subtitle="User engagement per session"
                        value="3m 25s"
                        trend="+8.2%"
                        trendColor="gray"
                        icon={<FaClock className="text-white text-xl" />}
                        iconBg="bg-gray-950"
                        color="gray"
                    >
                        <div className="mt-4 text-sm text-gray-950">
                            Desktop avg: <span className="font-semibold text-gray-700">4m 12s</span><br />
                            Mobile avg: <span className="font-semibold text-gray-700">2m 54s</span>
                        </div>
                        <button className="mt-4 text-sm text-gray-950 hover:underline">
                            See session insights →
                        </button>
                    </Card>

                </main>
            </div>

        </div>
    );
}

// Optional ProgressBar component
function ProgressBar({ label, percent, indent }) {
    return (
        <div className={`${indent ? "pl-5" : ""}`}>
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{percent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                    className="h-2 bg-gray-950 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
}


function Card({ title, subtitle, value, trend, trendColor, icon, iconBg, children }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-950">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-full ${iconBg} shadow-md`}>
                    {icon}
                </div>
            </div>

            <div className="flex items-center mt-4">
                <p className={`text-3xl font-bold text-${trendColor}-600`}>{value}</p>
                {trend && (
                    <span className={`ml-3 text-sm font-medium text-${trendColor}-500`}>
                        {trend}
                    </span>
                )}
            </div>

            {children}
        </div>
    );
}

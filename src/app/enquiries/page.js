"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../common/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../common/Header";

export default function Enquiry() {
    const apibaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [activeTab, setActiveTab] = useState("enquiry-list");
    const [enquiryStates, setEnquiryStates] = useState([]);
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [tableData, setTableData] = useState("");
    const [enquiryData, setEnquiryData] = useState([])

    return (
        <div className=" grid grid-cols-[30%_auto] ">
            <SideBar />
            <div>

                <Header />

                <main className="h-[90vh] overflow-y-scroll w-full px-10 py-3">


                    <h2 className="text-[40px] font-bold mb-6 capitalize">View Enquiries</h2>
                    <div>
                        <div className="grid grid-cols-4 gap-3 my-6">
                            <button
                                onClick={() => setActiveTab("enquiry-list")}
                                className={`${activeTab === "enquiry-list"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                Enquiry List
                            </button>
                            <button
                                onClick={() => setActiveTab("enquiry-data")}
                                className={`${activeTab === "enquiry-data"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                Add Enquiry Data
                            </button>
                        </div>
                    </div>
                    {activeTab === "enquiry-list" && (
                        <EnquiryList enquiryData={enquiryData} setEnquiryData={setEnquiryData} apibaseUrl={apibaseUrl} />
                    )}
                    {activeTab === "enquiry-data" && (
                        <AddEnquiryData
                            tableData={tableData}
                            setTableData={setTableData}
                            cityName={cityName}
                            setCityName={setCityName}
                            stateName={stateName}
                            setStateName={setStateName}
                            enquiryStates={enquiryStates}
                            setEnquiryStates={setEnquiryStates}
                            apibaseUrl={apibaseUrl}
                        />
                    )}
                </main>
            </div>

        </div>
    );
}

function Dot() {
    return <div className="w-4 h-4 border-4  bg-white rounded-[10px]"></div>;
}

function EnquiryList({ apibaseUrl, setEnquiryData, enquiryData }) {


    const viewEnquiryEntries = () => {
        axios
            .get(`${apibaseUrl}/enquiry/all-entries`)
            .then((res) => res.data)
            .then((finalRes) => {
                setEnquiryData(finalRes.enquiryData)
            });
    }

    useEffect(() => {
        viewEnquiryEntries()
    }, [enquiryData])



    return (
        <div className="bg-white font-sans min-h-screen">
            <table className="min-w-full overflow-x-scroll  border border-gray-300">
                <thead className="bg-gray-100">
                    <tr className="text-sm">
                        <th className="border border-gray-300 px-2 py-2 text-left">
                            Sr. No
                        </th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">
                            Email
                        </th>
                        <th className="border border-gray-300 px-2 py-2 text-left">
                            Phone
                        </th>
                        <th className="border border-gray-300 px-2 py-2 text-left">
                            State
                        </th>
                        <th className="border border-gray-300 px-2 py-2 text-left">City</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">
                            Program
                        </th>
                        <th className="border border-gray-300 px-2 py-2 text-left">
                            Course
                        </th>
                        <th className="border border-gray-300 px-2 py-2 text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {enquiryData.map((item, index) => {
                        return (
                            <tr
                                key={index}

                            // className={`${idx % 2 === 0 ? "bg-gray-50" : ""} text-sm`}
                            >
                                <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-2 py-2">{item.enquiryName}</td>
                                <td className="border border-gray-300 px-2 py-2">{item.enquiryEmail}</td>
                                <td className="border border-gray-300 px-2 py-2">{item.enquiryPhone}</td>
                                <td className="border border-gray-300 px-2 py-2">{item.enquiryState}</td>
                                <td className="border border-gray-300 px-2 py-2">{item.enquiryCity}</td>
                                <td className="border border-gray-300 px-2 py-2">{item.enquiryProgram}</td>
                                <td className="border border-gray-300 px-2 py-2">{item.enquiryCourse}</td>
                                <td className="border border-gray-300 px-2 py-2 text-center">
                                    <button className="text-black text-sm cursor-pointer">
                                        Mark
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    );
}

function AddEnquiryData({
    tableData,
    setTableData,
    apibaseUrl,
    cityName,
    setCityName,
    stateName,
    setStateName,
    enquiryStates,
    setEnquiryStates,
}) {
    const saveState = (e) => {
        e.preventDefault();
        axios
            .post(`${apibaseUrl}/enquiry/add-state`, { stateName })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    Swal.fire({
                        title: "State Added",
                        icon: "success",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } else {
                    Swal.fire({
                        title: "State name is already exist !",
                        icon: "warning",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    });
                }
            });
    };

    const saveCity = (e) => {
        e.preventDefault();
        axios
            .post(`${apibaseUrl}/enquiry/add-city`, { cityName, stateName })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    Swal.fire({
                        title: "City Added Successfully",
                        icon: "success",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } else {
                    Swal.fire({
                        title: "City Name is already Exist !",
                        icon: "warning",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    });
                }
            });
    };


    const viewCity = () => {
        axios
            .get(`${apibaseUrl}/enquiry/view-city`)
            .then((res) => res.data)
            .then((finalRes) => {
                setTableData(finalRes.cityRes);
            });
    };

    useEffect(() => {
        viewCity();
    }, []);

    const viewEnquiryState = () => {
        axios
            .get(`${apibaseUrl}/enquiry/view-state`)
            .then((res) => res.data)
            .then((finalRes) => {
                setEnquiryStates(finalRes.enquiryStateData);
            });
    };

    useEffect(() => {
        viewEnquiryState();
    }, []);

    return (
        <div className="bg-white font-sans min-h-screen">
            <form onSubmit={saveState} className="mb-[30px]">
                <p className="mb-1 font-semibold text-lg">Add State</p>
                <input
                    required
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="Enter state name"
                    type="text"
                    className="w-full border  border-gray-300 rounded-[5px] px-3 focus:outline-none  py-[10px]"
                />
                <button className="py-2 bg-gray-950 text-white cursor-pointer px-10 mt-3 rounded">
                    Add State
                </button>
            </form>

            <form onSubmit={saveCity} className="mb-[30px]">
                <div className="mb-2">
                    <p className="mb-1 font-semibold text-lg">Select State</p>
                    <select
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full border border-gray-300 cursor-pointer rounded-[5px] px-3 focus:outline-none  py-[10px]"
                    >
                        <option>Select State</option>

                        {enquiryStates.map((items, indexes) => {
                            return (
                                <option key={indexes} value={items._id}>
                                    {items.stateName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="">
                    <p className="mb-1 font-semibold text-lg">Add City</p>
                    <input
                        required
                        onChange={(e) => setCityName(e.target.value)}
                        placeholder="Enter city name"
                        type="text"
                        className="w-full border border-gray-300 rounded-[5px] px-3 focus:outline-none  py-[10px]"
                    />
                </div>
                <button className="py-2 bg-gray-950 text-white cursor-pointer px-10 mt-3 rounded">
                    Add City
                </button>
            </form>

            <div className="bg-white text-black p-6 rounded shadow-md max-w-4xl mx-auto mt-10">
                <h2 className="text-3xl font-bold mb-6">States and Cities</h2>

                <table className="w-full border border-gray-300 table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Sr. No
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                State Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                City
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {enquiryStates.map((state, idx) => {
                            const citiesOfState = tableData
                                ? tableData.filter((city) => city.state._id === state._id)
                                : [];

                            return (
                                <React.Fragment key={state._id}>
                                    {citiesOfState.length === 0 ? (
                                        <tr className="bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">
                                                {idx + 1}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {state.stateName}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                No Cities Added yet
                                            </td>
                                        </tr>
                                    ) : (
                                        citiesOfState.map((city, cityIndex) => (
                                            <tr
                                                key={city._id}
                                                className={cityIndex % 2 === 0 ? "bg-gray-50" : ""}
                                            >
                                                {cityIndex === 0 && (
                                                    <>
                                                        <td
                                                            className="border border-gray-300 px-4 py-2"
                                                            rowSpan={citiesOfState.length}
                                                        >
                                                            {idx + 1}
                                                        </td>
                                                        <td
                                                            className="border border-gray-300 px-4 py-2"
                                                            rowSpan={citiesOfState.length}
                                                        >
                                                            {state.stateName}
                                                        </td>
                                                    </>
                                                )}
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {city.cityName}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

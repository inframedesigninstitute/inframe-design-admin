'use client'
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { GiConfirmed, GiWoodFrame } from "react-icons/gi";
import { TbFrame, TbKeyframes } from "react-icons/tb";






export default function SideBar() {

  const slug = usePathname().split('/')[1]
  const tabs = [
    "dashboard",
    "user",
    "enquiries",
    "add-course",
    "add-study-material",
    "add-test-series",
    "slider",
    "testimonial",
  ]

  return (
    <div className="w-full h-[100vh] overflow-y-scroll border-r-2 border-gray-200 shadow-lg">
      {/* <img
          className="max-w-[150px] mx-auto h-[150px] -mt-10 object-contain"
          src="/logo.jpg"
        /> */}
      <h3 className="px-5 pt-8 text-[30px] flex items-center gap-1 font-bold"><TbFrame className="text-gray-100 text-7xl -mr-10 " />  Inframe <span className="text-gray-400">Design</span>   </h3>
      <ul className="px-10 ">
        {tabs.map((item, index) => {
          return (
            <Link key={index} href={`/${item}`}>
              <li
                key={index}
                className={`${slug === item ? 'bg-gray-950 text-white' : 'bg-gray-50 text-black'} cursor-pointer py-[13px]  my-[20px] capitalize hover:bg-gray-950 hover:text-white px-3 rounded-[10px] duration-300 border border-gray-200 hover:border-transparent`}
              >
                {item.replaceAll(/[^a-zA-Z0-9 ]/g, " ")}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

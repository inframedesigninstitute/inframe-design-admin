"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserData } from "../redux/slices/userSlice";
import Swal from "sweetalert2";

export default function Form() {
  const dispatch = useDispatch();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  let [showPassword, setShowPassword] = useState(false);
  const [admin_userEmail, setAdmin_userEmail] = useState("");
  const [admin_userPassword, setAdmin_userPassword] = useState("");
  const token = useSelector((store) => store.loginStore.token)
  console.log(token)
  let [error, setError] = useState([]);

  const loginForm = (e) => {
    e.preventDefault();
    const obj = {
      admin_userEmail,
      admin_userPassword
    }
    axios.post(`${apiBaseUrl}/user/login`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        const obj = { token: finalRes.token }
        if (finalRes.status == 1) {
          dispatch(loginUserData(obj))
          Swal.fire({
            title: 'Login Successfully !',
            text: 'you are now login',
            icon: 'success',
            iconColor: 'black',
            color: 'black',
            background: 'white',
          }).then((res) => {
            if (res.isConfirmed) {
              router.push("/dashboard");
            }
          })
        }
        else {
          Swal.fire({
            title: 'Invalid Username or Password !',
            text: 'you enter a invalid data to login',
            icon: 'error',
            iconColor: 'black',
            color: 'black',
            background: 'white',
            timer: 2000
          })
        }
      })
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(349deg,rgba(38, 38, 38, 1) 0%, rgba(64, 64, 64, 1) 50%, rgba(26, 26, 26, 1) 100%)",
      }}
      className="w-[100%] h-[100vh] "
    >
      <div className="fixed top-[50%] overflow-hidden bg-white rounded-[10%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <img
          className="max-w-[180px] -mt-7 mx-auto h-[180px] object-contain border-gray-100"
          src="/logo.jpg"
          alt=""
        />
        <form onSubmit={loginForm} className="-mt-16" action="">
          <div className=" w-[450px] flex flex-col gap-[10px] rounded-[10px] h-auto p-7 ">
            <h1 className="font-bold text-gray-900 text-[25px]">
              Sign in to your account
            </h1>
            <label className="block text-gray-900 font-semibold" htmlFor="">
              Email
            </label>
            <input
              onChange={(e) => setAdmin_userEmail(e.target.value)}
              name="userEmail"
              required
              className="w-[100%] border-[1px] border-gray-300 ps-[5px] py-[8px] rounded-[5px]"
              type="email"
              placeholder="Enter your email"
            />
            <label className="block text-gray-900 font-semibold" htmlFor="">
              Password
            </label>
            <input
              onChange={(e) => setAdmin_userPassword(e.target.value)}
              name="userPassword"
              required
              className="w-[100%] border-[1px] border-gray-300 ps-[5px] py-[8px] rounded-[5px]"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password"
            />
            <div>
              <input
                onClick={() => setShowPassword(!showPassword)}
                type="checkbox"
              />{" "}
              Show password
            </div>
            <div className="flex items-center text-[14px] gap-[5px]">
              <p className="text-red-700 mt-[8px] font-semibold text-[15px]">
                {error}
              </p>
              <p className="px-[15px] py-[4px] rounded-[6px] mt-[10px] bg-gray-950 cursor-pointer hover:bg-gray-900 text-white">
                Forget Password ?
              </p>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-[100%] py-[10px] bg-gray-900 mt-[15px] rounded-[5px] font-semibold text-white"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

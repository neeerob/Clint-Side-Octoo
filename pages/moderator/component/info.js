import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";


export default function ModeratorInfo(props) {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [role, setRole] = useState(null);

    function toggleDropdown() {
        setDropdownVisible(prevVisible => !prevVisible);
      }
      
  
    useEffect(() => {
      setRole(sessionStorage.getItem('role'));
      const button = document.getElementById("edit-button");
      button.addEventListener("click", toggleDropdown);
      return () => {
        button.removeEventListener("click", toggleDropdown);
      };
    }, []);
      
 
  return (
    <>
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span className="text-green-500">
            <svg
              className="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="tracking-wide">Profile Information</span>
        </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                            <div className="px-4 py-2">{props.firstname}</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                            <div className="px-4 py-2">{props.lastname}</div>
                                        </div>


                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Catagory</div>
                                            <div className="px-4 py-2">{role}</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2">{props.phone}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Current Address</div>
                                            <div className="px-4 py-2">Dhaka, Bangladesh</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email.</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href={`mailto:${props.email}`}>{props.email}</a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Birthday</div>
                                            <div className="px-4 py-2">{new Date(props.dob).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                        </div>
                                    </div>
                                </div>
                                <dev>

                                </dev>
                                    <div style={{marginTop:"10px"}} className="relative w-full">
                                    <button
                                    id="edit-button"
                                    type="button"
                                    className="bg-indigo-600 py-1 px-4 rounded text-white text-sm hover:bg-indigo-500 flex justify-center items-center"
                                    style={{ width: "8rem" }}
                                    >
                                    Edit
                                    </button>

                                        <div
                                            id="dropdown-menu"
                                            className={`absolute bg-white border border-gray-200 rounded-md shadow-md ${
                                                dropdownVisible ? "" : "hidden"
                                            }`}
                                            style={{ width: "250px" }}
                                            >
                                            <a href="./changeInfo" className="block py-2 px-4 hover:bg-gray-100">
                                                Change Profile Information
                                            </a>
                                            <a href="./changeProfilePic" className="block py-2 px-4 hover:bg-gray-100">
                                                Change Profile Picture
                                            </a>
                                            <a href="./changePassword" className="block py-2 px-4 hover:bg-gray-100">
                                                Reset Password
                                            </a>
                                        </div>

                                    </div>
                            </div>

    </>
  );
}
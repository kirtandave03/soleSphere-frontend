import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import { MdManageAccounts, MdLogout } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const TopBar = () => {
  const email = useSelector((state) => state.email);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const adminName = email.split("@")[0];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="h-12 w-full bg-white py-4 pl-2 pr-6 flex justify-between items-center">
      <div className="flex items-center">
        <div className="font-bold text-xl">
          <span className="text-[#4880FF]">Sole</span>Sphere
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative"></div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col text-center">
            <span className="text-black font-semibold">{adminName}</span>
            <span className="text-slate-400 text-sm">Admin</span>
          </div>
        </div>

        {/* <div className="relative">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className={"mt-3"}>
                <IoIosArrowDropdown className="h-5 w-5 mr-1 -ml-1" />
              </Menu.Button>
            </div>

            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <MdManageAccounts className="h-5 w-5 mr-2" />
                      Manage Account
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <FaKey className="h-4 w-4 mr-2" />
                      Change Password
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <MdLogout className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;

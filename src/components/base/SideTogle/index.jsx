import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function SideTogle() {
  const [sidebar, setSideBar] = useState(false);
  const router = useRouter();
  const toggleSidebar = (e) => {
    e.preventDefault();
    setSideBar(!sidebar);
  };
  return (
    <>
      <button
        className="drawer-button py-8 bg-blue-900 fixed top-0 rounded-r-3xl z-10 mt-16  hover:bg-blue-700 hover:delay-100 hover:transition-all cursor-pointer lg:hidden"
        onClick={toggleSidebar}
      >
        <i class="bi bi-arrow-bar-right text-white font-bold text-2xl"></i>
      </button>

      <div
        className={`fixed h-screen w-full delay-200 bg-[rgba(0,0,0,.5)] z-10 side-bar ${
          sidebar ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed h-screen w-[70%] bg-white side-bar z-20 pt-12 flex flex-col gap-12 ${
          sidebar ? "left-0" : "left-[-100%]"
        }`}
      >
        <button
          className="drawer-button py-8 bg-blue-900 absolute top-[40%] right-[-7%] rounded-r-3xl hover:bg-blue-700 hover:delay-100 hover:transition-all cursor-pointer lg:hidden"
          onClick={toggleSidebar}
        >
          <i class="bi bi-arrow-bar-right text-white font-bold text-2xl"></i>
        </button>
        <Link
          href={"/home"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/home"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}
        >
          <i class="bi bi-grid"></i>
          <p>Dashboard</p>
        </Link>
        <Link
          href={"/transfer"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/transfer"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}
        >
          <i class="bi bi-wallet2"></i>
          <p>Transfer</p>
        </Link>
        <div
          href={"/topup"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/topup"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}
        >
          <i class="bi bi-plus-circle "></i>
          <p>Top Up</p>
        </div>
        <Link
          href={"/profile"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/profile"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}
        >
          <i class="bi bi-person-plus-fill "></i>
          <p>Profile</p>
        </Link>
        <Link
          href={"/logout"}
          className={`flex pl-[15%] gap-4 text-2xl text-grey-secondary font-medium absolute bottom-0 mb-12 hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold`}
        >
          <i class="bi bi-box-arrow-right"></i>
          <p>Logout</p>
        </Link>
      </div>
    </>
  );
}

export default SideTogle;

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Topup from "components/base/Top-up";
import Logout from "components/base/LogoutModal";

function SideBar() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleTopup = () => {
    setModal(true);
  };
  const handleLogout = () => {
    setIsOpen(true);
  };

  return (
    <>
      {modal && <Topup modal={modal} setModal={setModal} />}
      {isOpen && <Logout isOpen={isOpen} setIsOpen={setIsOpen} />}
      <section className=" bg-[#FFFFFF] pt-12 drop-shadow-lg hidden lg:flex flex-col w-[25%] gap-14  pb-11 rounded-[1.3rem]  ">
        <Link
          href={"/home"}
          className={`flex gap-6 p-1 pl-8 cursor-pointer   hover:border-l-[5px] hover:border-primary ${
            router.pathname === "/home" || router.pathname === "/history"
              ? " border-l-[5px] border-primary font-bold text-primary"
              : "text-greySecondary font-semibold"
          }`}
        >
          <i className="bi bi-grid text-[1.75rem]"></i>
          <p className=" text-base xl:text-xl justify-center  font-semibold items-center flex ">
            Dashboard
          </p>
        </Link>
        <Link
          href={"/transfer"}
          className={`flex gap-6 p-1 pl-8 cursor-pointer   hover:border-l-[5px] hover:border-primary ${
            router.pathname === "/transfer" ||
            router.pathname === "/transfer/confirmPin" ||
            router.pathname === "/transfer/success" ||
            router.pathname === "/transfer/failed"
              ? " border-l-[5px] border-primary font-bold text-primary"
              : "text-greySecondary font-semibold"
          }`}
        >
          <i className="bi bi-arrow-up text-[1.75rem]"></i>
          <p className=" text-base xl:text-xl justify-center  font-semibold items-center flex ">
            Transfer
          </p>
        </Link>
        <div
          onClick={handleTopup}
          className=" flex gap-6 p-1 pl-8 cursor-pointer  hover:border-l-[5px] hover:border-primary"
        >
          <div className="  text-[1.75rem] text-greySecondary">
            <i className="bi bi-plus-lg"></i>
          </div>
          <div className=" text-base xl:text-xl justify-center font-semibold items-center flex text-greySecondary">
            <p>Top-Up</p>
          </div>
        </div>
        <Link
          href={"/profile"}
          className={`flex gap-6 p-1 pl-8 cursor-pointer   hover:border-l-[5px] hover:border-primary ${
            router.pathname === "/profile" ||
            router.pathname === "/profile/detail" ||
            router.pathname === "/profile/edit-pin" ||
            router.pathname === "/profile/edit-password" ||
            router.pathname === "/profile/phoneNumber"
              ? " border-l-[5px] border-primary font-bold text-primary"
              : "text-greySecondary font-semibold"
          }`}
        >
          <i className="bi bi-person-fill text-[1.75rem]"></i>
          <p className=" text-base xl:text-xl justify-center  font-semibold items-center flex ">
            Profile
          </p>
        </Link>
        <div
          className=" flex gap-6 p-1 pl-8 cursor-pointer  hover:border-l-[5px] mt-[12rem] hover:border-error"
          onClick={handleLogout}
        >
          <div className="  text-[1.75rem]">
            <i className="bi bi-box-arrow-right"></i>
          </div>
          <div className=" text-base xl:text-xl font-semibold justify-center items-center flex text-dark">
            <p>Logout</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SideBar;

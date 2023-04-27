/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getHistory } from "utils/https/history";
import Topup from "../Top-up";
import Logout from "../LogoutModal";

function Header() {
  const dataUser = useSelector((state) => state.profile.data.data);
  const linkCloud =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";
  const [sidebar, setSideBar] = useState(false);
  const router = useRouter();
  const toggleSidebar = (e) => {
    e.preventDefault();
    setSideBar(!sidebar);
  };
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleTopup = () => {
    setModal(true);
  };
  const handleLogout = () => {
    setIsOpen(true);
  };
  const handleNotif = () => {
    if (notif) {
      return setNotif(false);
    }
    setNotif(true);
  };
  const [formData, setFormData] = useState({
    page: 1,
    filter: "WEEK",
    limit: 5,
    data: [],
  });

  const token = useSelector((state) => state.auth.data?.token);
  const [notif, setNotif] = useState(false);
  useEffect(() => {
    const { filter, page, limit } = formData;

    getHistory(token, page, limit, filter)
      .then((response) => {
        // setLoading(false);
        setFormData({ ...formData, data: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {modal && <Topup modal={modal} setModal={setModal} />}
      {isOpen && <Logout isOpen={isOpen} setIsOpen={setIsOpen} />}
      <section className=" w-full flex flex-col z-[999]">
        <div
          className={`fixed h-screen w-full delay-200 bg-black bg-opacity-40 z-10 side-bar ${
            sidebar ? "block" : "hidden"
          }`}
          onClick={toggleSidebar}
        ></div>
        <div
          className={`fixed h-screen w-[50%] md:w-[40%] bg-white side-bar z-20 pt-12 flex flex-col gap-12 ${
            sidebar ? "left-0" : "left-[-100%]"
          }`}
        >
          <Link
            href={"/home"}
            className={`flex pl-[10%] gap-4 text-lg text-dark hover:border-l-4 hover:border-solid hover:border-primary hover:text-primary hover:font-bold ${
              router.pathname === "/home"
                ? "border-l-4 border-solid border-blue-600 text-primary font-bold"
                : "text-greySecondary font-bold"
            }`}
          >
            <i className="bi bi-grid"></i>
            <p>Dashboard</p>
          </Link>
          <Link
            href={"/transfer"}
            className={`flex pl-[10%] gap-4 text-lg text-dark hover:border-l-4 hover:border-solid hover:border-primary hover:text-primary hover:font-bold ${
              router.pathname === "/transfer"
                ? "border-l-4 border-solid border-blue-600 text-primary font-bold"
                : "text-greySecondary font-bold"
            }`}
          >
            <i className="bi bi-arrow-up"></i>
            <p>Transfer</p>
          </Link>
          <div
            // href={"/topup"}
            onClick={handleTopup}
            className={`flex pl-[10%] gap-4 text-lg font-bold text-greySecondary hover:border-l-4 hover:border-solid hover:border-primary hover:text-primary hover:font-bold `}
          >
            <i className="bi bi-plus-circle "></i>
            <p>Top Up</p>
          </div>
          <Link
            href={"/profile"}
            className={`flex pl-[10%] gap-4 text-lg text-dark hover:border-l-4 hover:border-solid hover:border-primary hover:text-primary hover:font-bold ${
              router.pathname === "/profile"
                ? "border-l-4 border-solid border-blue-600 text-primary font-bold"
                : "text-greySecondary font-bold"
            }`}
          >
            <i className="bi bi-person-plus-fill "></i>
            <p>Profile</p>
          </Link>
          <div
            // href={"/logout"}
            onClick={handleLogout}
            className={`flex pl-[10%] gap-4 text-lg text-dark text-greySecondary font-bold absolute bottom-0 mb-12 hover:border-l-4 hover:border-solid hover:border-primary hover:text-primary hover:font-bold`}
          >
            <i className="bi bi-box-arrow-right"></i>
            <p>Logout</p>
          </div>
        </div>
      </section>
      <section className=" relative z-[9] flex w-full justify-between flex-col md:flex-row items-center pt-3 md:pt-7 pb-12 bg-primary lg:bg-white  md:px-[3.4rem] xl:px-[9.4rem] rounded-b-2xl drop-shadow-lg">
        <div className=" flex gap-2 w-full md:w-auto  justify-start mb-4 md:mb-0 px-2 md:pl-0 ">
          <div
            onClick={toggleSidebar}
            className="text-[3rem] justify-start flex lg:hidden  md:text-[3rem] font-bold font-NunitoSans text-white lg:text-primary "
          >
            <i className="bi bi-list"></i>
          </div>
          <div className="text-[1.7rem] items-center justify-start md:hidden flex lg:flex  md:text-4xl font-bold font-NunitoSans text-white lg:text-primary ">
            <p>FazzPay</p>
          </div>
        </div>
        <div className=" flex gap-5 w-full md:w-auto pl-9 md:pl-0">
          <div className=" w-[3.3rem] h-[3.3rem] rounded-[0.68rem] overflow-hidden">
            <Image
              src={
                dataUser?.image === null
                  ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                  : `${linkCloud}${dataUser?.image}`
              }
              width={52.8}
              height={52.8}
              alt="photoProfile"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className=" hidden lg:flex flex-col justify-center gap-1">
            <div className=" text-lg font-bold text-dark">
              <p>
                {dataUser?.firstName} {dataUser?.lastName || ""}
              </p>
            </div>
            <div className=" text-sm text-dark">
              <p>{dataUser?.noTelp || "Phone number has not been added"}</p>
            </div>
          </div>
          <div className=" flex lg:hidden flex-col justify-center gap-1 ">
            <div className=" text-lg font-bold text-white lg:text-dark">
              <p>Hello,</p>
            </div>
            <div className=" text-sm text-white lg:text-dark">
              <p>
                {" "}
                {dataUser?.firstName} {dataUser?.lastName || ""}
              </p>
            </div>
          </div>
          <div
            onClick={handleNotif}
            className="text-white lg:text-dark text-[2rem]  justify-center items-center flex font-bold cursor-pointer px-8 md:px-0 ml-auto md:ml-4 lg:ml-0"
          >
            <i className="bi bi-bell"></i>
          </div>
          <div
            className={`h-[612px] w-[403px] bg-white rounded-[20px] pb-7  mt-[7rem] drop-shadow-2xl justify-end flex flex-col ml-auto absolute z-[60] ${
              notif ? " right-[40px] xl:right-[150px]" : "hidden"
            } `}
          >
            {formData.data.map((data) => (
              <div className="pt-[23px] " key={data.id}>
                <div className="w-[343px] h-[92px] bg-white drop-shadow-2xl rounded-[10px] m-auto ">
                  <div className="flex items-center p-4 gap-3">
                    {data.type === "send" ? (
                      <div className=" text-4xl text-[#f70000] flex items-center">
                        <i className="bi bi-arrow-up"></i>
                      </div>
                    ) : (
                      <div className=" text-4xl text-green-500 flex items-center">
                        <i className="bi bi-arrow-down"></i>
                      </div>
                    )}
                    <div>
                      {data.type === "send" ? (
                        <p className=" text-[#7A7A7A] text-sm">
                          Transfer to {data.firstName} {data.lastName}
                        </p>
                      ) : data.type === "topup" ? (
                        <p className=" text-[#7A7A7A] text-sm">Top Up</p>
                      ) : (
                        <p className=" text-[#7A7A7A] text-sm">
                          Accept from {data.firstName} {data.lastName}
                        </p>
                      )}

                      <p className="font-bold text-[#43484F] text-lg">
                        {`${data.amount.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;

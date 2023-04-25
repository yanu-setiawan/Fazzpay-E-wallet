/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import { getUserProfile } from "utils/https/user";
import ReactCodeInput from "react-code-input";
import { cekPin } from "utils/https/user";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import privateRoute from "utils/wrapper/private";
import { transferBalance } from "utils/https/transfer";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Title from "utils/wrapper/title";
import Loader from "components/base/Loader";
import { useDispatch } from "react-redux";
import { transactionActions } from "redux/slices/transactions";

function Success() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [input, setInput] = useState(true);
  const transactions = useSelector((state) => state.transactions.data);
  const profileUser = useSelector((state) => state.profile.data.data);
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  const transactionDate = () => {
    const arrbulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const date = new Date();
    const millisecond = date.getMilliseconds();
    const detik = date.getSeconds();
    const menit = date.getMinutes();
    const jam = date.getHours();
    const hari = date.getDay();
    const tanggal = date.getDate();
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    return `${arrbulan[bulan]} ${tanggal} , ${tahun} - ${jam}:${menit} `;
  };
  const linkCloud =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";
  return (
    <>
      <Title title="Success">
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-10 rounded-[1.3rem] pb-16">
              <div className="min-h-max bg-white-primary rounded-lg px-8 py-4">
                <div className="w-full flex flex-col justify-center items-center gap-4 mt-8">
                  <div className=" flex text-[#1EC15F] text-[4rem]">
                    <i class="bi bi-check-circle-fill"></i>
                  </div>
                  <p className="text-[#4D4B57] font-bold text-xl">
                    Transfer Success
                  </p>
                </div>
                <div className="flex items-center w-full flex-col justify-center">
                  <div className="flex gap-2 bg-white mt-5 w-full flex-col px-4 py-8 rounded-lg drop-shadow-sm">
                    <p className="text-[#7A7886]">Amount</p>
                    <p className="font-semibold text-2xl font-sans">
                      {rupiah(transactions.amount)}
                    </p>
                  </div>
                  <div className="flex gap-2 bg-white mt-5 w-full flex-col px-4 py-8 rounded-lg drop-shadow-sm">
                    <p className="text-[#7A7886]">Balance Left</p>
                    <p className="font-semibold text-2xl font-sans">
                      {rupiah(profileUser.balance - transactions.amount) ||
                        "Rp.0"}
                    </p>
                  </div>
                  <div className="flex gap-2 bg-white mt-5 w-full flex-col px-4 py-8 rounded-lg drop-shadow-sm">
                    <p className="text-[#7A7886]">Date & Time</p>
                    <p className="font-semibold text-2xl font-sans">
                      {transactionDate()}
                    </p>
                  </div>
                  <div className="flex gap-2 bg-white mt-5 w-full flex-col px-4 py-8 rounded-lg drop-shadow-sm">
                    <p className="text-[#7A7886]">Notes</p>
                    <p className="font-semibold text-2xl font-sans">
                      {transactions.notes}
                    </p>
                  </div>
                </div>
                <p className="text-[#514F5B] font-bold mt-12">Transfer to</p>
                <div className="flex gap-6 bg-white mt-4 px-2 py-4 mb-8 drop-shadow-sm rounded-md">
                  <div className="">
                    <Image
                      src={
                        transactions.image === null
                          ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                          : `${linkCloud}${transactions.image}`
                      }
                      alt="profile"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-grey-primary font-bold">
                      {transactions.firstName} {transactions.lastName}
                    </p>
                    <p className="text-grey-secondary">{transactions.noTelp}</p>
                  </div>
                </div>
                <div className="mt-16 flex justify-end w-full gap-4 lg:gap-8">
                  <button className="btn py-2 h-14 bg-primary border-none text-primary font-bold hover:bg-primary hover:bg-opacity-40 rounded-xl w-max bg-opacity-30">
                    <i className="bi bi-download mr-2 font-bold"></i>
                    Download PDF
                  </button>
                  <button
                    className="btn py-2 h-14 bg-primary border-none text-white font-bold hover:bg-primary rounded-xl w-40"
                    onClick={() => {
                      dispatch(transactionActions.filter());
                      router.push("/home");
                    }}
                  >
                    Back To Home
                  </button>
                </div>
              </div>
            </section>
          </section>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            theme="light"
          />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(Success);

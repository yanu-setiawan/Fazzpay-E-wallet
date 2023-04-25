/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import Title from "utils/wrapper/title";
import { useRouter } from "next/router";
import { getUserProfile } from "utils/https/user";
import ReactCodeInput from "react-code-input";
import { cekPin } from "utils/https/user";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import { transferBalance } from "utils/https/transfer";
import privateRoute from "utils/wrapper/private";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "components/base/Loader";
import { useDispatch } from "react-redux";
import { transactionActions } from "redux/slices/transactions";

function Confirmation() {
  const linkCloud =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";
  const dispatch = useDispatch();
  const router = useRouter();
  const [cekPinError, setCekPinError] = useState(false);
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState();
  const [input, setInput] = useState(true);
  const [data, setData] = useState();
  const [modalPin, setModalPin] = useState(false);
  const [getPin, setGetPin] = useState("");
  const valuePin = (e) => (setInput(true), setGetPin(`${e}`));
  const transactions = useSelector((state) => state.transactions.data);
  const profileUser = useSelector((state) => state.profile.data.data);
  const token = useSelector((state) => state.auth.data.data.token);

  const transferHandler = (e) => {
    e.preventDefault();
    if (getPin.length < 6 || !getPin)
      return setInput(false), toast.error("Please input pin correctly");
    setInput(true);
    setLoading(true);
    cekPin(getPin, token, controller)
      .then(() => {
        transferBalance(
          {
            receiverId: transactions.receiverId,
            amount: transactions.amount,
            notes: transactions.notes,
          },
          token,
          controller
        )
          .then((res) => {
            // console.log(res);
            router.push("/transfer/succes");
          })
          .catch((err) => {
            console.log(err);
            toast.error("error");
            router.push("/transfer/failed");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setInput(false);
        toast.error(err.response.data.msg);
        setLoading(false);
        setCekPinError(true);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
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
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  const style = {
    className: "reactCodeInput",
    inputStyle: {
      border: "2px solid #939393",
      // fontFamily: "Nunito Sans",
      marginLeft: "7.5px",
      marginRight: "7.5px",
      MozAppearance: "textfield",
      width: "2.8rem",
      borderRadius: "10px",
      fontSize: "30px",
      height: "3rem",
      backgroundColor: "white",
      color: "#3A3D42",
      // border: `2px solid }`,
      textAlign: "center",
      flexDirection: "row",
      marginBottom: "3rem",
      outline: "none",
    },
  };

  return (
    <>
      <Title title="Transfer-Confirm">
        {loading ? <Loader /> : <></>}
        {modalPin && (
          <>
            <div className="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-10">
              <div className="w-[400px] h-[330px] bg-white px-4 py-6 rounded-lg relative">
                <button
                  className="absolute w-[30px] h-[30px] rounded-full  flex justify-center pb-3 items-center text-white-primary right-0 mr-4 text-[32px] font-bold text-[#F70000] cursor-pointer
              "
                  onClick={(e) => {
                    e.preventDefault();
                    setModalPin(false);
                  }}
                >
                  &times;
                </button>
                <p className="font-bold text-dark text-lg mb-4">
                  Enter Pin to Transfer
                </p>
                <p className="text-greySecondary text-base ">
                  Enter your 6 digits PIN for confirmation to continue
                  transferring money.{" "}
                </p>
                <div className="w-ful flex justify-center mt-10">
                  <ReactCodeInput
                    type="password"
                    fields={6}
                    inputMode="numeric"
                    pattern="/^-?\d+\.?\d*$/"
                    value={getPin}
                    onChange={valuePin}
                    {...style}
                  />
                </div>
                <div className="w-full justify-end flex mt-auto">
                  <button
                    className=" btn hover:bg-primary bg-primary w-40 px-2 text-white font-bold rounded-xl border-none py-2"
                    onClick={transferHandler}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-10 rounded-[1.3rem] pb-16">
              <div className="min-h-max bg-white-primary rounded-lg px-8 py-4">
                <p className="font-bold text-dark text-xl">Transfer To</p>
                <>
                  <div className="flex gap-6 bg-white mt-8 px-2 py-4 mb-8 h-[11%]">
                    {/* <Image
                      src={
                        transactions.image === null
                          ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                          : `${linkCloud}${transactions.image}`
                      }
                      alt="profile"
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    /> */}
                    <div className=" w-[3.8rem] h-[3.8rem] rounded-[0.68rem] overflow-hidden">
                      <Image
                        src={
                          transactions.image === null
                            ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                            : `${linkCloud}${transactions.image}`
                        }
                        width={60}
                        height={60}
                        alt="photoProfile"
                        className=" w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#4D4B57] text-lg font-bold">
                        {transactions.firstName} {transactions.lastName}
                      </p>
                      <p className="text-[#7A7886]">{transactions.noTelp}</p>
                    </div>
                  </div>
                  <p className="font-bold text-dark text-xl">Details</p>
                  <div className="flex items-center w-full flex-col justify-center">
                    <div className="flex gap-2 bg-white mt-6 w-full flex-col px-4 py-6 rounded-xl shadow-md">
                      <p className="text-[#7A7886]">Amount</p>
                      <p className="font-semibold text-xl font-sans">
                        {rupiah(transactions.amount)}
                      </p>
                    </div>
                    <div className="flex gap-2 bg-white mt-6 w-full flex-col px-4 py-6 rounded-xl shadow-md">
                      <p className="text-[#7A7886]">Balance Left</p>
                      <p className="font-semibold text-xl font-sans">
                        {rupiah(profileUser.balance) || "Rp.0"}
                      </p>
                    </div>
                    <div className="flex gap-2 bg-white mt-6 w-full flex-col px-4 py-6 rounded-xl shadow-md">
                      <p className="text-[#7A7886]">Date & Time</p>
                      <p className="font-semibold text-xl font-sans">
                        {transactionDate()}
                      </p>
                    </div>
                    <div className="flex gap-2 bg-white mt-6 w-full flex-col px-4 py-6 rounded-xl shadow-md">
                      <p className="text-[#7A7886]">Notes</p>
                      <p className="font-semibold text-xl font-sans">
                        {transactions.notes}
                      </p>
                    </div>
                    <div className="mt-16 flex justify-end w-full">
                      <button
                        className="btn hover:bg-primary bg-primary w-40 px-2 text-white font-bold rounded-xl border-none py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalPin(true);
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </>
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

export default privateRoute(Confirmation);

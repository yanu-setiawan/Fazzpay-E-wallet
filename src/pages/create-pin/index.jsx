/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import phone from "assets/vector/phoneTwo.png";
import Link from "next/link";
import Title from "utils/wrapper/title";
// import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/base/Loader";

import { createPin } from "utils/https/user";
const ReactCodeInput = dynamic(import("react-code-input"));
import swal from "sweetalert";
import privateRoute from "utils/wrapper/private";

function CreatePin() {
  const [emptypin, setEmptyPin] = useState(true);
  const [input, setInput] = useState(false);
  const [getPin, setGetPin] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [goto, setGoto] = useState(false);
  const router = useRouter();
  const userData = useSelector((state) => state.auth.data);
  const valuePin = (e) => (setInput(true), setGetPin(`${e}`));

  const handleConfirm = (event) => {
    event.preventDefault();
    setisLoading(true);
    const sendPin = parseInt(getPin);
    createPin(sendPin, userData.token, userData.id)
      .then(() => {
        router.push("/create-pin/pinSucces");
      })
      .catch((err) => {
        console.log(err);
        return swal("Failed", err.response.data.msg, "error");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const style = {
    className: "reactCodeInput",
    inputStyle: {
      border: "2px solid #939393",
      // fontFamily: "Nunito Sans",
      marginLeft: "7.5px",
      marginRight: "7.5px",
      MozAppearance: "textfield",
      width: "10%",
      borderRadius: "10px",
      fontSize: "30px",
      height: "60px",
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
      <Title title="Create-Pin">
        {isLoading ? <Loader /> : <></>}
        <main className=" w-full flex ">
          <section className="hidden hero-home w-[55%]  lg:flex flex-col  pt-[3.2rem] px-[10%] pb-20">
            <div className=" mb-10">
              <p className="text-2xl justify-start flex  md:text-4xl font-bold font-NunitoSans text-white">
                FazzPay
              </p>
            </div>
            <div>
              <Image src={phone} alt="phone" />
            </div>
            <div className=" text-2xl font-bold text-white mt-3">
              <p>App that Covering Banking Needs.</p>
            </div>
            <div className=" text-white text-base  lg:mt-8">
              <p>
                FazzPay is an application that focussing in banking needs for
                all users in the world. Always updated and always following
                world trends. 5000+ users registered in FazzPay everyday with
                worldwide users coverage.
              </p>
            </div>
          </section>
          <section className="w-full  lg:w-[45%] flex flex-col px-[7%] md:px-[10%] lg:pl-[2.5rem] lg:pr-2 xl:px-14 pt-[3.5rem] md:pt-[5rem] lg:pt-[8rem]">
            <div className=" flex lg:hidden mb-[4rem] md:mb-24">
              <p className="text-[1.7rem] justify-start flex  md:text-4xl font-bold font-NunitoSans text-primary">
                FazzPay
              </p>
            </div>
            <div className=" text-dark text-[1.4rem] md:text-[2rem] lg:text-[1.3rem] xl:text-2xl  font-bold leading-8 md:leading-[3rem] lg:leading-8 ">
              <p>
                Secure Your Account, Your Wallet, <br /> and Your Data With 6
                Digits PIN <br />
                That You Created Yourself.
              </p>
            </div>
            <div className="text-[0.8rem] xl:text-base text-[#3A3D4299] mt-8 leading-7">
              <p>
                Create 6 digits pin to secure all your money and your data in{" "}
                <br />
                FazzPay app. Keep it secret and don’t tell anyone about your{" "}
                <br />
                FazzPay account password and the PIN.
              </p>
            </div>
            <form
              className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col "
              onSubmit={handleConfirm}
            >
              <div className="flex justify-center items-center gap-2 w-full ">
                <div className=" flex justify-center items-center px-[auto]">
                  <ReactCodeInput
                    type="password"
                    fields={6}
                    pattern="/^-?\d+\.?\d*$/"
                    onChange={valuePin}
                    value={getPin}
                    {...style}
                  />
                </div>
              </div>
              <div className="lg:w-[90%] mt-6 lg:mt-2 ">
                <button
                  type="submit"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (getPin.length < 6 || !getPin)
                      return (
                        setInput(false),
                        toast.error("Please input pin correctly")
                      );
                  }}
                  // disabled={emptypin}
                  className="px-2 py-4 disabled:bg-greythirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-primary text-white"
                >
                  Confirm
                </button>
              </div>
            </form>
          </section>
        </main>
      </Title>
    </>
  );
}

export default privateRoute(CreatePin);

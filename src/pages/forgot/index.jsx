/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useMemo } from "react";
import Image from "next/image";
import phone from "assets/vector/phoneTwo.png";
import Link from "next/link";
import { usersAction } from "redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/base/Loader";
import swal from "sweetalert";
import { forgot } from "utils/https/auth";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/private";
import publicRoute from "utils/wrapper/publicRoute";

function Forgot() {
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setIsLoading] = useState();
  const [input, setInput] = useState(true);
  const [email, setEmail] = useState();
  const handleEmail = (e) => {
    setInput(true);
    setEmail(e.target.value);
  };
  const users = useSelector((state) => state.auth);

  const handleForgot = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return setInput(false), toast.error("Data cannot be empty");
    if (!emailRegex.test(email))
      return setInput(false), toast.error("Invalid email");
    setInput(true);
    setIsLoading(true);
    forgot(
      {
        email,
        // linkDirect: "http://localhost:3000/forgot"
        linkDirect: process.env.NEXT_PUBLIC_FORGOT_URL,
      },
      controller
    )
      .then((res) => {
        console.log(res.data);
        swal("success", res.data.msg, "success");
      })
      .catch((err) => {
        console.log(err);
        setInput(false);
        swal("Failed", err.response.data.msg, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Title title="Forgot">
        {(users.isLoading || isLoading) && <Loader />}
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
                Did You Forgot Your Password? <br /> Don’t Worry, You Can Reset
                Your <br /> Password In a Minutes.
              </p>
            </div>
            <div className="text-[0.8rem] xl:text-base text-[#3A3D4299] mt-8 leading-7">
              <p>
                To reset your password, you must type your e-mail and we <br />{" "}
                will send a link to your email and you will be directed to the{" "}
                <br /> reset password screens.
              </p>
            </div>
            <form className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col">
              <div className="mb-8 flex gap-2 relative">
                <i
                  className={`bi bi-envelope text-2xl absolute top-[10%] `}
                ></i>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="Enter your email"
                  className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%] `}
                />
              </div>
              <div className="lg:w-[90%] mt-6 lg:mt-2 ">
                <button
                  type="submit"
                  onClick={handleForgot}
                  className="px-2 py-4 disabled:bg-greythirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-primary text-white"
                >
                  Confirm
                </button>
              </div>
            </form>
          </section>
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

export default publicRoute(Forgot);

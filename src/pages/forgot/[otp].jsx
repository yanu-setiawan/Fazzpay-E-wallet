/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import phone from "assets/vector/phoneTwo.png";
import Link from "next/link";
import { usersAction } from "redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "utils/https/auth";
import Loader from "components/base/Loader";
import swal from "sweetalert";
import Title from "utils/wrapper/title";
import publicRoute from "utils/wrapper/publicRoute";

function UserId() {
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setIsLoading] = useState();
  const [input, setInput] = useState(true);
  const router = useRouter();
  const [iconEye1, setIconEye1] = useState(false);
  const toggleIcon1 = () => {
    iconEye1 ? setIconEye1(false) : setIconEye1(true);
  };
  const [iconEye2, setIconEye2] = useState(false);
  const toggleIcon2 = () => {
    iconEye2 ? setIconEye2(false) : setIconEye2(true);
  };

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const users = useSelector((state) => state.auth);

  const onChangeForm = (event) => {
    setForm((form) => {
      setInput(true);
      return {
        ...form,
        [event.target.name]: event.target.value,
      };
    });
  };
  const confirmHandler = (e) => {
    e.preventDefault();
    if (form.newPassword == "" || form.confirmPassword == "")
      return setInput(false), toast.error("Data is required!");
    if (form.newPassword !== form.confirmPassword) {
      return setInput(false), toast.error("passwords don't match");
    }
    setIsLoading(true);
    setInput(true);
    resetPassword(
      {
        keysChangePassword: parseInt(router.query.otp),
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      },
      controller
    )
      .then((res) => {
        swal("success", res.data.msg, "success");
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        console.log(err);
        swal("Failed", err.response.data.msg, "error");
        router.push("/forgot");

        setInput(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Title title="Otp">
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
            <form
              className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col"
              onSubmit={confirmHandler}
            >
              <div className="mb-6 flex gap-2 relative ">
                <i
                  className={`bi bi-lock-fill absolute text-2xl top-[10%] `}
                ></i>
                <input
                  name="newPassword"
                  id="newPassword"
                  onChange={onChangeForm}
                  type={`${iconEye1 ? "text" : "password"}`}
                  className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%] `}
                  placeholder="Enter your password"
                />
                <i
                  className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                    iconEye1 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                  }`}
                  onClick={toggleIcon1}
                ></i>
              </div>
              <div className="mb-6 flex gap-2 relative ">
                <i
                  className={`bi bi-lock-fill absolute text-2xl top-[10%] `}
                ></i>
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={onChangeForm}
                  type={`${iconEye2 ? "text" : "password"}`}
                  className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%] `}
                  placeholder="Enter your password"
                />
                <i
                  className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                    iconEye2 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                  }`}
                  onClick={toggleIcon2}
                ></i>
              </div>
              <div className="lg:w-[90%] mt-6 lg:mt-2 ">
                <button
                  type="submit"
                  onSubmit={confirmHandler}
                  disabled={
                    form.newPassword === "" || form.confirmPassword == ""
                  }
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

export default publicRoute(UserId);

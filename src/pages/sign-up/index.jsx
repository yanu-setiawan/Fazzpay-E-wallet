/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Image from "next/image";
import branding from "assets/vector/phoneTwo.png";
import { register } from "utils/https/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import phone from "assets/vector/phoneTwo.png";
import Link from "next/link";
import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "components/base/Loader";
import Title from "utils/wrapper/title";
import publicRoute from "utils/wrapper/publicRoute";

function Register() {
  const [input, setInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const [iconEye, setIconEye] = useState(false);
  const toggleIcon = () => {
    iconEye ? setIconEye(false) : setIconEye(true);
  };
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChangeForm = (event) => {
    setForm((form) => {
      return {
        ...form,
        [event.target.name]: event.target.value,
      };
    });
  };

  const registerHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      setIsLoading(false);

      return setInput(false), toast.error("Data is Required!");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setIsLoading(false);

      return setInput(false), toast.error("Invalid Email!");
    }
    if (form.password.length < 4) {
      setIsLoading(false);
      return setInput(false), toast.error("Password of at least 4 characters!");
    }

    register(form.firstName, form.lastName, form.email, form.password)
      .then(() => {
        swal(
          "Success",
          "Register successful, check your email to activation",
          "success"
        );
        return router.push("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        return swal("Failed", err.response.data.msg, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Title title="Sign-Up">
        <main className=" w-full flex ">
          {isLoading ? <Loader /> : <></>}
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
          <section className=" w-full  lg:w-[45%] flex flex-col px-[7%] md:px-[10%] lg:pl-[2.5rem] lg:pr-2 xl:px-14 pt-[3.5rem] md:pt-[5rem] lg:pt-[8rem]">
            <div className=" flex lg:hidden mb-[4rem] md:mb-24">
              <p className="text-[1.7rem] justify-start flex  md:text-4xl font-bold font-NunitoSans text-primary">
                FazzPay
              </p>
            </div>
            <div className=" text-dark text-[1.4rem] md:text-[2rem] lg:text-[1.3rem] xl:text-2xl font-bold leading-8 md:leading-[3rem] lg:leading-8 ">
              <p>
                Start Accessing Banking Needs <br /> With All Devices and All
                Platforms <br /> With 30.000+ Users
              </p>
            </div>
            <div className="text-[0.8rem] xl:text-base text-[#3A3D4299] mt-8 leading-7">
              <p>
                Transfering money is eassier than ever, you can access <br />{" "}
                FazzPay wherever you are. Desktop, laptop, mobile phone? <br />{" "}
                we cover all of that for you!
              </p>
            </div>
            <form
              className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col"
              onSubmit={registerHandler}
            >
              <div className="mb-8 flex gap-2 relative">
                <i className="bi bi-person text-2xl absolute top-[10%] text-greythirty focus:text-primary"></i>
                <input
                  onChange={onChangeForm}
                  name="firstName"
                  type="text"
                  placeholder="Enter your firstname"
                  className="w-full border-b-2 border-solid border-greySecondary p-2 pl-10 focus:outline-none lg:w-[90%] focus:border-primary"
                />
              </div>
              <div className="mb-8 flex gap-2 relative">
                <i className="bi bi-person text-2xl absolute top-[10%] text-greythirty focus:text-primary"></i>
                <input
                  onChange={onChangeForm}
                  name="lastName"
                  type="text"
                  placeholder="Enter your lastname"
                  className="w-full border-b-2 border-solid border-greySecondary p-2 pl-10 focus:outline-none lg:w-[90%] focus:border-primary"
                />
              </div>
              <div className="mb-8 flex gap-2 relative">
                <i className="bi bi-envelope text-2xl absolute top-[10%] text-greythirty focus:text-primary"></i>
                <input
                  onChange={onChangeForm}
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="w-full border-b-2 border-solid border-greySecondary p-2 pl-10 focus:outline-none lg:w-[90%] focus:border-primary"
                />
              </div>
              <div className="mb-6 flex gap-2 relative  ">
                <i className="bi bi-lock-fill absolute text-2xl top-[10%] text-greythirty focus:text-primary"></i>
                <input
                  onChange={onChangeForm}
                  name="password"
                  type={`${iconEye ? "text" : "password"}`}
                  className="w-full border-b-2 border-solid border-greySecondary p-2 pl-10 focus:outline-none lg:w-[90%] focus:border-primary"
                  placeholder="Enter your password"
                />
                <i
                  className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                    iconEye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                  }`}
                  onClick={toggleIcon}
                ></i>
              </div>
              <div className="lg:w-[90%] mt-6 lg:mt-2 ">
                <button
                  onSubmit={registerHandler}
                  type="submit"
                  disabled={
                    form.email === "" ||
                    form.password === "" ||
                    form.firstName === "" ||
                    form.lastName === ""
                  }
                  className="px-2 py-4 disabled:bg-greythirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-primary text-white"
                >
                  Sign-Up
                </button>
                <p className="font-bold text-greySecondary mb-12 lg:mb-0">
                  Already have an account? Let’s{" "}
                  <Link
                    href={"/login"}
                    className="text-primary font-bold cursor-pointer  border-primary appearance-none"
                  >
                    Login
                  </Link>
                </p>
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

export default publicRoute(Register);

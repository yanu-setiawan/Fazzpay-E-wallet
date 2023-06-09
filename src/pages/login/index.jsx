/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import { profileAction } from "redux/slices/profile";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import phone from "assets/vector/phoneTwo.png";
import Link from "next/link";
import { authAction } from "redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/base/Loader";
import swal from "sweetalert";
import Title from "utils/wrapper/title";
import publicRoute from "utils/wrapper/publicRoute";

function Login() {
  const router = useRouter();
  const [input, setInput] = useState();
  const [iconEye, setIconEye] = useState(false);
  const toggleIcon = () => {
    iconEye ? setIconEye(false) : setIconEye(true);
  };
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (e) =>
    setFormLogin((form) => {
      setInput(true);
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });

  const handleLogin = (event) => {
    event.preventDefault();
    if (!formLogin.email || !formLogin.password)
      return setInput(false), toast.error("Data is Required!");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formLogin.email)) {
      setInput(false), toast.error("Invalid Email!");
      return;
    }
    dispatch(
      authAction.doLogin({
        email: formLogin.email,
        password: formLogin.password,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res);
        setInput(true);
        dispatch(
          profileAction.getProfile({
            id: res.data.id,
            token: res.data.token,
            controller,
          })
        );

        // console.log(profileAction);
        const pin = res.data.pin;
        //   setTimeout(() => {
        //     if (pin === null) {
        //       return router.push("/create-pin");
        //     } else {
        //       return router.push("/home");
        //     }
        //   }, 2000);
        // })

        if (pin === null) {
          return router.push("/create-pin");
        } else {
          return router.push("/home");
        }
      })
      .catch((error) => {
        // console.log(error);
        setInput(false);
        return swal("Failed", error.response.data.msg, "error");
      });
  };
  return (
    <>
      <Title title="Login">
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
              onSubmit={handleLogin}
            >
              <div className="mb-8 flex gap-2 relative">
                <i
                  className={`bi bi-envelope text-2xl absolute top-[10%] text-greythirty  ${
                    input ? "text-primary" : "text-error"
                  }`}
                ></i>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={onChangeForm}
                  placeholder="Enter your email"
                  className={`w-full border-b-2 border-solid border-greythirty  p-2 pl-10 focus:outline-none lg:w-[90%] focus:border-primary ${
                    input ? "border-primary" : "border-error"
                  }`}
                />
              </div>
              <div className="mb-6 flex gap-2 relative ">
                <i
                  className={`bi bi-lock-fill absolute text-2xl top-[10%] text-greythirty  ${
                    input ? "text-primary" : "text-error"
                  }`}
                ></i>
                <input
                  name="password"
                  id="password"
                  onChange={onChangeForm}
                  type={`${iconEye ? "text" : "password"}`}
                  className={`w-full border-b-2 border-solid border-greythirty   p-2 pl-10 focus:outline-none lg:w-[90%]  ${
                    input ? "border-primary" : "border-error"
                  }`}
                  placeholder="Enter your password"
                />
                <i
                  className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                    iconEye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                  }`}
                  onClick={toggleIcon}
                ></i>
              </div>

              <Link href={"/forgot"}>
                <div className=" text-sm px-3 w-full lg:w-[90%] flex mb-10">
                  <p className=" text-[#3A3D42CC] w-max ml-auto cursor-pointer hover:text-error font-semibold justify-end flex">
                    Forgot Password ?
                  </p>
                </div>
              </Link>
              <div className="lg:w-[90%] mt-6 lg:mt-2 ">
                <button
                  type="submit"
                  onSubmit={handleLogin}
                  disabled={formLogin.email === "" || formLogin.password === ""}
                  className="px-2 py-4 disabled:bg-greythirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-primary text-white"
                >
                  Login
                </button>
                <p className="font-bold text-greySecondary mb-12 lg:mb-0">
                  Already have an account? Let’s{" "}
                  <Link
                    href={"/sign-up"}
                    className="text-primary font-bold  border-primary appearance-none"
                  >
                    Sign Up
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

export default publicRoute(Login);

/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import phone from "assets/vector/phoneTwo.png";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/private";
function pinSuccess() {
  return (
    <>
      <Title title="Pin-Success">
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
          <section className="w-full  lg:w-[45%] flex flex-col px-[7%] md:px-[10%] lg:pl-[2.5rem] lg:pr-2 xl:px-14 pt-[3.5rem] md:pt-[5rem]">
            <div className=" flex lg:hidden mb-[4rem] md:mb-24">
              <p className="text-[1.7rem] justify-start flex  md:text-4xl font-bold font-NunitoSans text-primary">
                FazzPay
              </p>
            </div>
            <div className=" text-dark text-[1.4rem] md:text-[2rem] lg:text-[1.3rem] xl:text-2xl gap-12 flex flex-col font-bold leading-8 md:leading-[3rem] lg:leading-8 ">
              <div className=" flex text-[#1EC15F] text-[4rem]">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <p>Your PIN Was Successfully Created</p>
            </div>
            <div className="text-[0.8rem] xl:text-base text-[#3A3D4299] mt-8 leading-7">
              <p>
                Your PIN was successfully created and you can now access <br />{" "}
                all the features in FazzPay.
              </p>
            </div>
            <div>
              <Link href={"/home"}>
                <button className=" h-14 bg-primary font-bold text-white w-[80%] text-lg rounded-xl mt-36">
                  Go To Dashboard
                </button>
              </Link>
            </div>
          </section>
        </main>
      </Title>
    </>
  );
}

export default privateRoute(pinSuccess);

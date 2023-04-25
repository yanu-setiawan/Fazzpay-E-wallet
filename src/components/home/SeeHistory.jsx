import React from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import { useRouter } from "next/router";
// import { getHistory } from "utils/https/history";

function SeeHistory({ fullName, image, status, amount, type }) {
  const router = useRouter();
  const rupiah = (number) => {
    if (number) {
      return `RP. ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  return (
    <section className=" flex  justify-between mt-11 ">
      <div className=" flex gap-5">
        <div className=" w-[3.3rem] h-[3.3rem] rounded-[0.68rem] overflow-hidden">
          <Image
            src={image}
            alt="pp"
            className=" w-full h-full object-cover"
            width={52.8}
            height={52.8}
          />
        </div>
        <div className=" flex flex-col justify-center gap-1">
          <div className=" text-base font-bold text-dark">
            <p>{fullName}</p>
          </div>
          <div className=" text-sm text-dark">
            <p>{type}</p>
          </div>
        </div>
      </div>
      <div className=" text-error text-base justify-center items-center flex font-bold cursor-pointer">
        <p
          className={`text-center place-items-center text-md font-semibold place-self-center ${
            type === "topup" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "topup" ? "+" : "-"} {rupiah(amount)}
        </p>
      </div>
    </section>
  );
}

export default SeeHistory;

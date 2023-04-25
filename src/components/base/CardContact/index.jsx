import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function CardContact({ userId, image, firstName, lastName, noTelp }) {
  const router = useRouter();
  return (
    <section
      className=" flex gap-5 w-full shadow-md py-7 px-4 rounded-[20px] items-center bg-white cursor-pointer"
      onClick={() => {
        router.push(`/transfer/${userId}`);
      }}
    >
      <div className=" w-[4.4rem] h-[4.4rem] rounded-[0.68rem] overflow-hidden">
        <Image
          src={image}
          width={70.4}
          height={70.4}
          alt="photoProfile"
          className=" w-full h-full object-cover"
        />
      </div>
      <div className=" flex flex-col gap-2">
        <p className=" text-xl font-bold">
          {firstName} {lastName}
        </p>
        <p className=" text-lg text-greyFont">{noTelp}</p>
      </div>
    </section>
  );
}

export default CardContact;

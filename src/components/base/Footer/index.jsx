import React from "react";

function Footer() {
  return (
    <section className=" flex bg-primary p-5 justify-between px-8 xl:px-[6.4rem]">
      <section className=" flex flex-col lg:flex-row justify-between  gap-4 lg:gap-0 w-full">
        <div className="text-sm lg:text-base text-[#EFEFEF]">
          <p>2020 FazzPay. All right reserved.</p>
        </div>
        <div className=" flex gap-4 lg:gap-10 flex-col lg:flex-row">
          <p className="text-sm lg:text-base text-[#EFEFEF]">
            +62 5637 8882 9901
          </p>
          <p className=" text-sm lg:text-base text-[#EFEFEF]">
            Contact@fazzpay.com
          </p>
        </div>
      </section>
    </section>
  );
}

export default Footer;

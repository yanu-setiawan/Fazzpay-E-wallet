/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { changePassword } from "../../../utils/https/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { profileAction } from "redux/slices/profile";
import Loader from "../Loader";
import { topUp } from "utils/https/user";

function Topup({ modal, setModal }) {
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.auth.data.token);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [linkPayment, setLinkPay] = useState("");
  const [valueTopup, setValueTopup] = useState("");

  const onChangeTopup = (event) => {
    setInvalid(false);
    const { value } = event.target;
    const regex = /^[0-9\b]+$/;
    if (value === "" || regex.test(value)) {
      setValueTopup(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (valueTopup < 10000) return setInvalid(true);
    setLoading(true);
    const form = { amount: valueTopup };
    try {
      const result = await topUp(token, form, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        // setModal(false);
        setLinkPay(result.data.data.redirectUrl);
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      return swal("Failed", "Please manage phone number ", "error");
    }
  };

  const handleNavigateLink = () => {
    window.open(linkPayment, "_blank");
    setModal(false);
    swal("Success", "Top-Up Success", "success");
  };

  return (
    <>
      {isLoading ? <Loader /> : <></>}
      <section className=" w-full h-full bg-black  bg-opacity-60  fixed z-50  inset-0">
        {isSuccess ? (
          <div className=" flex w-screen h-screen justify-center items-center">
            <div className="w-4/5 md:w-[560px] p-8 md:p-10 flex flex-col bg-white rounded-2xl justify-center items-center">
              <p className="text-4xl font-bold text-dark text-center my-14">
                Top-Up Payment Link
              </p>
              <button
                onClick={handleNavigateLink}
                className="btn bg-primary flex gap-3 text-white font-bold text-xl rounded-lg hover:bg-primary border-none p-2 h-14 w-[18rem]"
              >
                <p>Click To Pay</p>
                <i className="text-white bi bi-credit-card-fill"></i>
              </button>
            </div>
          </div>
        ) : (
          <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full py-6 px-[3rem] bg-white rounded-lg shadow lg:w-[33rem] lg:h-[30rem]  ">
                <div className="  flex justify-end ">
                  <button
                    type="button"
                    className="  text-[32px] font-bold text-[#F70000] cursor-pointer"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    &times;
                  </button>
                </div>

                <h2 className="text-2xl font-bold leading-tight tracking-tight text-dark md:text-2xl flex justify-start items-center">
                  Topup
                </h2>

                {isInvalid ? (
                  <p className=" text-lg text-[#f70000] pt-5 pb-11 ">
                    The minimum transaction amount is Rp. 10.000,-
                  </p>
                ) : (
                  <p className=" text-lg text-greyFont pt-5 pb-11 ">
                    Enter the amount of money, and click submit
                  </p>
                )}

                <form className="mt-4  lg:mt-5 ">
                  <div>
                    <input
                      value={valueTopup}
                      onChange={onChangeTopup}
                      placeholder="Rp. 0,-"
                      type="number"
                      name="amount"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-dark text-center text-xl leading-7 rounded-lg focus:outline-none  focus:border-primary block w-full p-2.5 h-16 "
                      required=""
                    />
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      onClick={handleSubmit}
                      disabled={
                        valueTopup === "" || valueTopup == 0 || isInvalid
                      }
                      type="submit"
                      className="w-[10.625rem] mt-28 h-14 text-white bg-primary focus:ring-4 focus:outline-none  font-bold rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </section>
    </>
  );
}

export default Topup;

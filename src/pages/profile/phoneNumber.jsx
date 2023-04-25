import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import SideTogle from "components/base/SideTogle";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "redux/slices/profile";
import { editProfile } from "utils/https/user";
import Loader from "components/base/Loader";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/private";

function PhoneNumber() {
  const router = useRouter();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const dataUser = useSelector((state) => state.profile.data.data);
  const stateUser = useSelector((state) => state.auth.data.data);
  // console.log(stateUser);
  const [isLoading, setLoading] = useState(false);
  const [phoneValue, setPhoneVal] = useState(dataUser.noTelp);

  const onChangeInput = (event) => {
    const { value } = event.target;
    const regex = /^[0-9]+$/;
    if (regex.test(value) || value === "") {
      setPhoneVal(value);
    }
  };

  const handleUpdatePhone = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = stateUser.token;
    const id = stateUser.id;
    const form = { noTelp: phoneValue };
    try {
      const result = await editProfile(token, id, form, controller);
      if (result.status && result.status === 200) {
        dispatch(profileAction.getProfile);
        setLoading(false);
        swal("Success", result.data.msg, "success");
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return swal("Failed", error.response.data.msg, "error");
    }
  };

  return (
    <>
      <Title title="Phone-Number">
        {isLoading ? <Loader /> : <></>}
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-16 rounded-[1.3rem]">
              <section className=" flex px-8 flex-col gap-6 mb-14">
                <div className=" text-dark font-bold text-xl">
                  <h3>Edit Phone Number</h3>
                </div>
                <div className=" text-greyFont text-lg">
                  <p>
                    Add at least one phone number for the transfer <br /> ID so
                    you can start transfering your money to <br /> another user.
                  </p>
                </div>
              </section>
              <form className=" flex flex-col px-8 w-full gap-[1.3rem] justify-center items-center mt-12">
                <div className="mb-8 flex gap-2 relative w-full md:w-[60%] pl-4 text-greyFont">
                  <i
                    className={`bi bi-telephone-plus text-2xl absolute top-[10%] `}
                  ></i>

                  <input
                    type="number"
                    name="noTelp"
                    id="phone"
                    onChange={onChangeInput}
                    placeholder="Enter your phone number"
                    className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%] text-xl `}
                  />
                </div>
                <div
                  className=" flex mt-9 w-full justify-center items-center "
                  onClick={handleUpdatePhone}
                >
                  <button className=" bg-primary p-5 text-xl text-white font-bold rounded-lg w-[60%] justify-center items-center">
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(PhoneNumber);

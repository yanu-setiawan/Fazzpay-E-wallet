import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import SideTogle from "components/base/SideTogle";
import { useSelector } from "react-redux";
import { editPassword } from "utils/https/user";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/private";
import Loader from "components/base/Loader";

function ChangePwd() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const inputFileRef = React.createRef();
  const [iconEye1, setIconEye1] = useState(false);
  const toggleIcon1 = () => {
    iconEye1 ? setIconEye1(false) : setIconEye1(true);
  };
  const [iconEye2, setIconEye2] = useState(false);
  const toggleIcon2 = () => {
    iconEye2 ? setIconEye2(false) : setIconEye2(true);
  };
  const [iconEye3, setIconEye3] = useState(false);
  const toggleIcon3 = () => {
    iconEye3 ? setIconEye3(false) : setIconEye3(true);
  };
  const controller = useMemo(() => new AbortController(), []);
  const userState = useSelector((state) => state.auth.data);
  // console.log(userState.token);

  const [oldPassword, setOldPass] = useState("");
  const [newPassword, setNewPass] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const handleConfirmChange = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      swal("Failed", " Your new password does not match.!", "error");
      return;
    }
    setLoading(true);
    const token = userState.token;
    const id = userState.id;
    const body = { oldPassword, newPassword, confirmPassword };
    // console.log(body);
    try {
      const result = await editPassword(token, id, body, controller);
      console.log(result);
      if (result.status && result.status === 200) {
        swal("Success", result.data.msg, "success");
        setLoading(false);
      }
      router.push("/profile");
      return;
    } catch (error) {
      console.log(error);
      // if (error.response.status && error.response.status === 400) {
      //   swal("Failed", error.response.data.msg, "error");
      //   setLoading(false);
      // }
    }
  };

  return (
    <>
      {loading ? <Loader /> : <></>}
      <Title title="Edit Password">
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-16 rounded-[1.3rem]">
              <section className=" flex px-8 flex-col gap-6 mb-14">
                <div className=" text-dark font-bold text-xl">
                  <h3>Change Password</h3>
                </div>
                <div className=" text-greyFont text-base md:text-lg">
                  <p>
                    You must enter your current password and <br /> then type
                    your new password twice.
                  </p>
                </div>
              </section>
              <div className=" flex flex-col px-8 gap-[1.3rem] w-full items-center">
                <form
                  className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col w-full md:w-[60%] justify-center "
                  onSubmit={handleConfirmChange}
                >
                  <div className="mb-6 flex gap-2 relative ">
                    <i
                      className={`bi bi-lock-fill absolute text-2xl top-[10%] text-[#A9A9A999] `}
                    ></i>
                    <input
                      name="currentPassword"
                      id="currentPassword"
                      value={oldPassword}
                      onChange={(event) => {
                        setOldPass(event.target.value);
                      }}
                      type={`${iconEye1 ? "text" : "password"}`}
                      className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%]`}
                      placeholder="Current password"
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
                      className={`bi bi-lock-fill text-[#A9A9A999] absolute text-2xl top-[10%] `}
                    ></i>
                    <input
                      id="newPassword"
                      name="newPassword"
                      value={newPassword}
                      onChange={(event) => {
                        setNewPass(event.target.value);
                      }}
                      type={`${iconEye2 ? "text" : "password"}`}
                      className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%] `}
                      placeholder="New password"
                    />
                    <i
                      className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                        iconEye2 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                      }`}
                      onClick={toggleIcon2}
                    ></i>
                  </div>
                  <div className="mb-6 flex gap-2 relative ">
                    <i
                      className={`bi bi-lock-fill absolute text-2xl top-[10%] text-[#A9A9A999]`}
                    ></i>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPass(event.target.value);
                      }}
                      type={`${iconEye3 ? "text" : "password"}`}
                      className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%] `}
                      placeholder="Repeat New password"
                    />
                    <i
                      className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                        iconEye3 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                      }`}
                      onClick={toggleIcon3}
                    ></i>
                  </div>
                  <div className="lg:w-[90%] mt-6 lg:mt-2 ">
                    <button
                      type="submit"
                      onClick={handleConfirmChange}
                      disabled={
                        oldPassword === "" ||
                        newPassword === "" ||
                        confirmPassword === ""
                      }
                      className="px-2 py-4 disabled:bg-greythirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-primary text-white"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(ChangePwd);

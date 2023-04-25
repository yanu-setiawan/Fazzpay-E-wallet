import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import SideTogle from "components/base/SideTogle";
import swal from "sweetalert";
import Loader from "components/base/Loader";
import { changePin, getPin } from "utils/https/user";
const ReactCodeInput = dynamic(import("react-code-input"));
import dynamic from "next/dynamic";
import Title from "utils/wrapper/title";
import { useRef } from "react";
import privateRoute from "utils/wrapper/private";

function EditPin() {
  const codeRef = useRef(undefined);

  const router = useRouter();
  const [edit, setEdit] = useState(true);
  const controller = useMemo(() => new AbortController(), []);
  const userState = useSelector((state) => state.auth.data);
  const token = userState.data.token;
  const id = userState.data.id;
  const [isLoading, setLoading] = useState(false);
  // const [confirmPin, setConfirm] = useState(true);
  const [change, setChange] = useState(false);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const valueNewPin = (e) => setNewPin(`${e}`);
  const valueOldPin = (e) => setOldPin(`${e}`);

  const checkPinHandler = async () => {
    setLoading(true);
    try {
      const result = await getPin(token, oldPin, controller);
      if (result.status && result.status === 200) {
        setLoading(false);
        setChange(true);
        setOldPin("");
        setNewPin("");

        codeRef.current.retry();

        swal("Success", result.data.msg, "success");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setChange(false);
      swal("Failed", error.response.data.msg, "error");
    }
  };

  const changeNewPin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await changePin(id, token, newPin, controller);
      if (result.status && result.status === 200) {
        setLoading(false);
        // swal("Success", result.data.msg, "success");
        router.push("/profile");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setChange(false);
      return swal("Failed", error.response.data.msg, "error");
    }
  };

  const style = {
    className: "reactCodeInput",
    inputStyle: {
      border: "2px solid #939393",
      // fontFamily: "Nunito Sans",
      marginLeft: "7.5px",
      marginRight: "7.5px",
      MozAppearance: "textfield",
      width: "3.5rem",
      borderRadius: "10px",
      fontSize: "30px",
      height: "3.6rem",
      backgroundColor: "white",
      color: "#3A3D42",
      // border: `2px solid }`,
      textAlign: "center",
      flexDirection: "row",
      marginBottom: "3rem",
      outline: "none",
    },
  };

  return (
    <>
      <Title title="Edit-Pin">
        {isLoading ? <Loader /> : <></>}
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            {!change ? (
              <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-16 rounded-[1.3rem]">
                <section className="flex flex-col">
                  <section className=" flex px-8 flex-col gap-6 mb-14">
                    <div className=" text-dark font-bold text-xl">
                      <h3>Change Pin</h3>
                    </div>
                    <div className=" text-greyFont text-base md:text-lg">
                      <p>
                        Enter your current 6 digits Fazzpay PIN below <br /> to
                        continue to the next steps.
                      </p>
                    </div>
                  </section>
                  <div className=" flex flex-col px-8 gap-[1.3rem] w-full items-center">
                    <form
                      className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col w-full md:w-[80%] justify-center "
                      // onSubmit={checkPinHandler}
                    >
                      <div className="flex justify-center items-center gap-2 w-full ">
                        <div className=" flex justify-center items-center ">
                          <ReactCodeInput
                            id="oldPin"
                            ref={codeRef}
                            name="oldPin"
                            onChange={valueOldPin}
                            type="password"
                            value={oldPin}
                            fields={6}
                            pattern="/^-?\d+\.?\d*$/"
                            {...style}
                          />
                        </div>
                      </div>
                      <div className=" mt-6 lg:mt-2 flex justify-center items-center w-full">
                        <button
                          onClick={() => {
                            checkPinHandler();
                            setOldPin("");
                          }}
                          // onClick={checkPinHandler}
                          type="button"
                          className="px-2 py-4 lg:w-[85%] justify-center items-center disabled:bg-greythirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-primary text-white"
                        >
                          Check Pin
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
              </section>
            ) : (
              <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-16 rounded-[1.3rem]">
                <section className="flex flex-col">
                  <section className=" flex px-8 flex-col gap-6 mb-14">
                    <div className=" text-dark font-bold text-xl">
                      <h3>Change Pin</h3>
                    </div>
                    <div className=" text-greyFont text-base md:text-lg">
                      <p>
                        Type your new 6 digits security PIN <br /> to use in
                        Fazzpay.
                      </p>
                    </div>
                  </section>
                  <div className=" flex flex-col px-8 gap-[1.3rem] w-full items-center">
                    <form className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col w-full md:w-[80%] justify-center ">
                      <div className="flex justify-center items-center gap-2 w-full ">
                        <div className=" flex justify-center items-center ">
                          <ReactCodeInput
                            // ref={codeRef}
                            id="newPin"
                            name="newPin"
                            onChange={valueNewPin}
                            type="password"
                            fields={6}
                            value={newPin}
                            pattern="/^-?\d+\.?\d*$/"
                            {...style}
                          />
                        </div>
                      </div>
                      <div className=" mt-6 lg:mt-2 flex justify-center items-center w-full">
                        <button
                          onClick={changeNewPin}
                          type="submit"
                          className="px-2 py-4 lg:w-[85%] justify-center items-center disabled:bg-greythirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-primary text-white"
                        >
                          Change Pin
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
              </section>
            )}
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(EditPin);

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import { getUserProfile } from "utils/https/user";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import SideTogle from "components/base/SideTogle";
import { useSelector } from "react-redux";
import privateRoute from "utils/wrapper/private";
import CardContact from "components/base/CardContact";
import { ToastContainer, toast } from "react-toastify";
import Title from "utils/wrapper/title";
import Loader from "components/base/Loader";
import { useDispatch } from "react-redux";
import { transactionActions } from "redux/slices/transactions";

function Transfer() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.auth.data.data.token);
  const linkCloud =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [input, setInput] = useState(true);
  const [notes, setNotes] = useState("");
  const profileUser = useSelector((state) => state.profile.data.data);
  // const balance = profile.balance;
  const id = router.query.userId;
  console.log(id);
  // console.log(router.query);
  const valuePrice = (e) => {
    setInput(true);
    setPrice(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    getUserProfile(id, token, controller)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg);
        if (err.response.data.msg === "Id user not found") {
          router.push(`/transfer?page=1&limit=4&search=`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleTransfer = (e) => {
    e.preventDefault();
    if (price == "")
      return setInput(false), toast.error("Enter your top up amount");
    if (profileUser.balance == 0) {
      return setInput(false), toast.error("your balance is empty");
    }
    if (profileUser.balance < price) {
      return toast.error("overlimit");
    }
    if (price < 10000) {
      return toast.error("minimum transfer of Rp.10.000");
    }

    return dispatch(
      transactionActions.getTransactions({
        receiverId: id,
        amount: price,
        notes: notes || "-",
        image: data.image,
        firstName: data.firstName,
        lastName: data.lastName,
        noTelp: data.noTelp || "-",
      })
    )
      .then((res) => {
        toast.success("Confirmation Payment"),
          router.push("/transfer/confirmPin");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg);
        // return swal("Failed", err.response.data.msg, "error");
      });
  };
  const rupiah = (number) => {
    if (number) {
      return `Rp. ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  //   console.log(data);

  return (
    <>
      <Title title="Transfer">
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-10 rounded-[1.3rem] pb-16">
              <div className="h-[95vh] bg-white rounded-lg px-8 py-4">
                <p className="font-bold text-dark text-xl">Transfer Money</p>
                {loading || !data ? (
                  <Loader />
                ) : (
                  <>
                    <div className="flex gap-6 bg-white mt-8 px-2 py-4 mb-8">
                      <div className=" w-[4.4rem] h-[4.4rem] rounded-[0.68rem] overflow-hidden">
                        <Image
                          src={
                            data.image === null
                              ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                              : `${linkCloud}${data.image}`
                          }
                          width={70.4}
                          height={70.4}
                          alt="photoProfile"
                          className=" w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-greyPrime font-bold text-lg">
                          {data.firstName} {data.lastName}
                        </p>
                        <p className="text-grey-secondary">
                          {data.noTelp || "-"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#7A7886] text-lg mb-16 ">
                      Type the amount you want to transfer and then <br /> press
                      continue to the next steps.
                    </p>
                    <input
                      type="number"
                      inputMode="numeric"
                      // disabled={linkTopUp}
                      placeholder="Rp.0"
                      className={`border-none active:outline-none font-bold focus:outline-none text-dark w-full text-[2.6rem] py-4 text-center arrow
                    ${input ? "border-primary" : "border-red-600"}`}
                      value={price}
                      onChange={valuePrice}
                    />
                    <p className="text-center text-lg font-bold mt-8 text-dark">
                      {rupiah(profileUser.balance) || "Rp.0"} Available
                    </p>
                    <div className="flex w-full mt-8 items-center justify-center md:mt-16">
                      <div className=" rounded-lg flex gap-4 relative min-[100px] w-[100%] items-center self-center md:w-[60%]">
                        <i className="bi bi-pencil-fill font-bold text-2xl absolute top-[20%] left-6 cursor-pointer"></i>
                        <input
                          type="text"
                          className="bg-transparent px-16 min-h-[65px] py-2 w-full focus:outline-none border-b-2  border-solid border-greythirty"
                          placeholder="Add some notes"
                          value={notes || ""}
                          onChange={(e) => {
                            setNotes(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-12 w-full flex gap-4 md:items-center md:justify-between md:mt-36">
                      <button
                        className="btn py-4 bg-[#f70000] border-none text-white font-bold hover:bg-red-600 rounded-2xl w-40 "
                        onClick={() => {
                          router.push(`/transfer?page=1&limit=4&search=`);
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="btn py-4 bg-primary border-none text-white font-bold hover:bg-primary rounded-2xl w-40"
                        onClick={handleTransfer}
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          </section>
          <Footer />
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

export default privateRoute(Transfer);

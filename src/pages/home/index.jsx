/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import SeeHistory from "components/home/SeeHistory";
import BarChart from "components/home/Chart";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import SideTogle from "components/base/SideTogle";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDashBoard } from "utils/https/user";
import { profileAction } from "redux/slices/profile";
import { Bar } from "react-chartjs-2";
import Topup from "components/base/Top-up";
import LoaderHist from "components/LoaderHist";
import Loader from "components/base/Loader";
import Title from "utils/wrapper/title";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getHistory } from "utils/https/history";
import privateRoute from "utils/wrapper/private";

function Home() {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const router = useRouter();
  const linkCloud =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";
  // console.log(router);
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingHistory, setLoadingHistory] = useState(false);
  // const [topUpSucces, setTopUpSucces] = useState(1);
  const [histories, setHistories] = useState([]);
  const token = useSelector((state) => state.auth.data.data.token);
  const id = useSelector((state) => state.auth.data.data.id);
  const dataUser = useSelector((state) => state.profile.data.data);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDashBoard(id, token, controller)
      .then((res) => {
        setChart(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoadingHistory(true);
    getHistory(token, controller)
      .then((res) => {
        setHistories(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingHistory(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      profileAction.getProfile({
        id,
        token,
        controller,
      })
    );
    setLoading(false);
  }, []);

  const rupiah = (number) => {
    if (number) {
      return `Rp. ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };

  const handleTransfer = () => {
    router.push("/transfer");
  };

  const incomeData = {
    label: "Income",
    data: chart.listIncome
      ? [
          chart.listIncome[5]?.total,
          chart.listIncome[6]?.total,
          chart.listIncome[0]?.total,
          chart.listIncome[1]?.total,
          chart.listIncome[2]?.total,
          chart.listIncome[3]?.total,
          chart.listIncome[4]?.total,
        ]
      : [],
    backgroundColor: "#6379F4",
  };
  const expenseData = {
    label: "Expense",
    data: chart.listExpense
      ? [
          chart.listExpense[5]?.total,
          chart.listExpense[6]?.total,
          chart.listExpense[0]?.total,
          chart.listExpense[1]?.total,
          chart.listExpense[2]?.total,
          chart.listExpense[3]?.total,
          chart.listExpense[4]?.total,
        ]
      : [],
    backgroundColor: "#9DA6B5",
  };
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [incomeData, expenseData],
  };
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    legend: {
      label: {
        fontSize: 14,
        fontFamily: "Nunito Sans",
      },
    },
  };
  return (
    <>
      <Title title="Dashboard">
        {loading ? <Loader /> : <></>}
        {modal && <Topup modal={modal} setModal={setModal} />}
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2 lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full   lg:w-[75%] drop-shadow-xl rounded-[1.3rem]">
              <section className=" flex w-full bg-primary rounded-[1.3rem] p-6  md:p-9 h-auto justify-between ">
                <div className=" flex flex-col gap-3">
                  <div className=" text-[#E0E0E0] text-lg ">
                    <p>Balance</p>
                  </div>
                  <div className=" font-bold text-[2.5rem] text-white">
                    <p>
                      Rp.{dataUser.balance.toLocaleString("id-ID") || "Rp. 0"}
                    </p>
                  </div>
                  <div className=" text-[#E0E0E0] text-base ">
                    <p>{dataUser.noTelp || "Phone Number required"}</p>
                  </div>
                </div>
                <div className=" md:flex flex-col md:gap-8 lg:gap-4 hidden">
                  <button
                    className="flex gap-3 w-[10.125rem] hover:bg-opacity-30 h-14 bg-greythirty bg-opacity-20 justify-center items-center rounded-xl border-2 border-white"
                    onClick={handleTransfer}
                  >
                    <div className="  text-[1.75rem] font-bold text-greythirty">
                      <i className="bi bi-arrow-up"></i>
                    </div>
                    <div className=" text-white font-bold text-lg">
                      <p>Transfer</p>
                    </div>
                  </button>
                  <button
                    className="flex gap-3 w-[10.125rem] hover:bg-opacity-30 h-14 bg-greythirty bg-opacity-20 justify-center items-center rounded-xl border-2 border-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setModal(true);
                    }}
                  >
                    <div className="  text-[1.75rem] font-bold text-greythirty">
                      <i className="bi bi-plus-lg"></i>
                    </div>
                    <div className=" text-white font-bold text-lg">
                      <p>Top-Up</p>
                    </div>
                  </button>
                </div>
              </section>
              <div className="flex md:hidden justify-center gap-6">
                <button className="flex gap-3 w-[10.125rem]  h-14 bg-[#EAEDFF] justify-center items-center rounded-xl border-2 ">
                  <div className="  text-[1.75rem] font-bold text-primary">
                    <i className="bi bi-arrow-up"></i>
                  </div>
                  <div className=" text-[#514F5B] font-bold text-lg">
                    <p>Transfer</p>
                  </div>
                </button>
                <button className="flex gap-3 w-[10.125rem]  h-14 bg-[#EAEDFF] justify-center items-center rounded-xl border-2 ">
                  <div className="  text-[1.75rem] font-bold text-primary">
                    <i className="bi bi-plus-lg"></i>
                  </div>
                  <div className=" text-[#514F5B] font-bold text-lg">
                    <p>Top-Up</p>
                  </div>
                </button>
              </div>
              <section className=" flex gap-6 flex-col lg:flex-row">
                <section className=" lg:flex w-[50%] xl:w-[58%] hidden bg-white drop-shadow-lg px-8 flex-col py-9 rounded-3xl gap-28 justify-center  ">
                  <div className="flex justify-between w-full ">
                    <div className="w-[60%] flex flex-col items-center">
                      <i className="bi bi-arrow-down text-green-500 text-3xl font-extrabold"></i>
                      <p className="text-grey-secondary">Income</p>
                      <p className="text-grey-primary text-lg font-bold">
                        {rupiah(chart.totalIncome) || "Rp. 0"}
                      </p>
                    </div>
                    <div className="w-[50%] flex flex-col items-center">
                      <i className="bi bi-arrow-up text-red-500 text-3xl font-extrabold"></i>
                      <p className="text-grey-secondary">Expense</p>
                      <p className="text-grey-primary text-lg font-bold">
                        {rupiah(chart.totalExpense) || "Rp. 0"}
                      </p>
                    </div>
                  </div>
                  <div className=" flex mt-auto">
                    <Bar
                      data={data}
                      options={chartOptions}
                      className={"relative top-1"}
                      height={180}
                    />
                  </div>
                </section>
                <section className=" w-full lg:w-[50%] xl:w-[42%] flex flex-col bg-white p-7 rounded-[1.3rem] drop-shadow-lg ">
                  <section className=" flex justify-between mb-3">
                    <p className=" text-lg text-dark font-bold">
                      Transactions History
                    </p>
                    <p
                      onClick={() => router.push("/history")}
                      className=" text-base text-primary font-semibold cursor-pointer"
                    >
                      See all
                    </p>
                  </section>

                  {loadingHistory ? (
                    <div className="relative h-[100%] flex justify-center items-center mt-20">
                      <LoaderHist />
                    </div>
                  ) : histories?.data?.length < 1 ? (
                    <p className=" text-xl text-dark text-center justify-center items-center">
                      Not transaction yet
                    </p>
                  ) : (
                    histories.map((data) => {
                      return (
                        <SeeHistory
                          key={data.id}
                          fullName={data.fullName}
                          image={
                            data.image == null
                              ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                              : `${linkCloud}${data.image}`
                          }
                          status={data.status}
                          amount={data.amount}
                          type={data.type}
                        />
                      );
                    })
                  )}
                </section>
              </section>
            </section>
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(Home);

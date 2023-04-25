import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getHistories } from "utils/https/user";
import LoaderHist from "components/LoaderHist";
import CardHist from "components/home/CardHist";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/private";

function History() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.auth.data.data.token);
  const [isLoading, setLoading] = useState(true);
  const [metaPage, setMetaPage] = useState(1);
  const [sort, setSort] = useState("");
  const [metaLimit, setMetaLimit] = useState(6);
  const [totalPage, setTotalPage] = useState("");
  const [filter, setFilter] = useState("");
  const [dataHistory, setDataHistory] = useState([]);
  const sortHandler = (e) => {
    setSort(e.target.value);
  };
  const fetching = async () => {
    setLoading(true);
    router.replace({
      pathname: "/history",
      query: {
        page: metaPage,
        limit: metaLimit,
        filter,
      },
    });
    const params = { page: metaPage, limit: metaLimit, filter };
    try {
      const result = await getHistories(token, params, controller);
      console.log(result.data);
      if (result.status && result.status === 200) {
        setDataHistory(result.data.data);
        setTotalPage(result.data.pagination.totalPage);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (info) => {
    if (info === "next") return setMetaPage(metaPage + 1);
    if (info === "prev") return setMetaPage(metaPage - 1);
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, metaPage]);
  return (
    <>
      <Title title="hitory">
        <main>
          <Header />
          <section className=" bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-1 md:px-2 lg:px-[3.4rem] justify-between xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full   lg:w-[75%] p-8 bg-white drop-shadow-xl rounded-[1.3rem]">
              <section className=" flex justify-between  mt-5 ">
                <p className=" text-xl text-dark font-bold">
                  Transactions History
                </p>

                <div className="relative">
                  <select
                    className="border text-lg cursor-pointer bg-greythirty  rounded-md text-dark h-10 px-5  hover:border-gray-400 focus:outline-none appearance-none"
                    name="filter"
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option className=" cursor-pointer font-medium" value={""}>
                      {" "}
                      -- Select Filter --{" "}
                    </option>
                    <option
                      className=" cursor-pointer font-medium"
                      value="WEEK"
                    >
                      Week
                    </option>
                    <option
                      className=" cursor-pointer font-medium"
                      value="MONTH"
                    >
                      Month
                    </option>
                    <option
                      className=" cursor-pointer font-medium"
                      value="YEAR"
                    >
                      Year
                    </option>
                  </select>
                </div>
              </section>
              {isLoading ? (
                <LoaderHist />
              ) : (
                <>
                  <section className=" flex flex-col   md:max-h-[60vh] md:pr-4">
                    {dataHistory.map((data) => (
                      <CardHist
                        key={data.id}
                        img={data.image}
                        firstName={data.firstName}
                        lastName={data.lastName}
                        fullName={data.fullName}
                        notes={data.notes}
                        type={data.type}
                        amount={data.amount}
                        times={data.createdAt}
                      />
                    ))}
                  </section>
                  <section className=" flex gap-3 justify-center items-center lg:mt-auto">
                    <button
                      onClick={() => handlePagination("prev")}
                      disabled={metaPage === 1}
                      className="bg-primary rounded-xl font-bold text-white p-2 w-[6rem] disabled:bg-greythirty disabled:text-dark"
                    >
                      Prev
                    </button>
                    <p className=" text-lg">
                      {metaPage} / {totalPage}
                    </p>
                    <button
                      onClick={() => handlePagination("next")}
                      disabled={metaPage === totalPage}
                      className="bg-primary rounded-xl font-bold text-white p-2 w-[6rem] disabled:bg-greythirty disabled:text-dark "
                    >
                      Next
                    </button>
                  </section>
                </>
              )}
            </section>
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(History);

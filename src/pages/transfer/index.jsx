/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import SideTogle from "components/base/SideTogle";
import privateRoute from "utils/wrapper/private";
import Title from "utils/wrapper/title";
import { getContact } from "utils/https/user";
import { useSelector } from "react-redux";
import CardContact from "components/base/CardContact";
import LoaderHist from "components/LoaderHist";

function Transfer() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [paginations, setPagination] = useState();
  const token = useSelector((state) => state.auth.data.data.token);
  const linkCloud =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";

  const handleSearch = (e) => {
    setPage(1);
    router.push(`/transfer?page=${page}&limit=4&search=${search}`);
  };
  // console.log(router.query.search);
  useEffect(() => {
    setLoading(true);
    router.push(`/transfer?page=${page}&limit=4&search=${search}`);
    getContact(page, router.query.search || "", token, controller)
      .then((res) => {
        // console.log(res.data.data);
        setDatas(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.query.search, page]);

  return (
    <>
      <Title title="Transfer">
        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-10 rounded-[1.3rem] pb-16">
              <div className="h-[100vh] bg-white-primary rounded-lg px-8 py-4  ">
                <p className="font-bold text-xl text-dark">Search Receiver</p>
                <div className="bg-[#3A3D421A] mt-8 rounded-lg flex gap-4 relative min-[100px]">
                  <i
                    className="bi bi-search font-bold text-xl absolute top-[20%] left-6 cursor-pointer"
                    onClick={handleSearch}
                  ></i>
                  <input
                    type="text"
                    className="bg-transparent px-16 min-h-[60px] py-2 w-full focus:outline-none focus:border-b-2 hover:border-b-2 border-solid border-grey-primary"
                    placeholder="Search receiver here"
                    value={search || ""}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                {loading ? (
                  <div className="flex justify-center items-center  mx-auto pt-[10rem] w-full relative">
                    <LoaderHist />
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 mt-8">
                    {datas.length <= 0 && (
                      <div className="mt-12 mb-12 text-center">
                        <p className="font-bold text-3xl text-red-600">
                          Contacts not found
                        </p>
                      </div>
                    )}
                    {datas.map((data) => {
                      return (
                        <CardContact
                          key={data.id}
                          userId={data.id}
                          image={
                            data.image == null
                              ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                              : `${linkCloud}${data.image}`
                          }
                          firstName={data.firstName}
                          lastName={data.lastName}
                          noTelp={data.noTelp || "-"}
                        />
                      );
                    })}
                    <div className="w-full flex justify-center items-center gap-3 ">
                      <button
                        className={`px-5 btn border-none bg-primary text-white rounded-xl hover:bg-primary ${
                          paginations.page === 1 &&
                          "text-dark border-grey-thirty before:bg-transparent hover:text-grey-thirty"
                        }`}
                        disabled={paginations.page === 1}
                        onClick={() => {
                          setPage(page - 1);
                        }}
                      >
                        prev
                      </button>
                      <p className="font-semibold">
                        {paginations.totalPage === 0 ? "0" : paginations.page} /{" "}
                        {paginations.totalPage}
                      </p>
                      <button
                        className={` px-5 btn border-none bg-primary text-white rounded-xl hover:bg-primary ${
                          paginations.page === paginations.totalPage ||
                          (paginations.totalPage === 0 &&
                            "text-dark border-grey-thirty before:bg-transparent hover:text-grey-thirty")
                        }`}
                        disabled={
                          paginations.page === paginations.totalPage ||
                          paginations.totalPage === 0
                        }
                        onClick={() => {
                          // e.preventDefault();
                          setPage(page + 1);
                        }}
                      >
                        next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(Transfer);

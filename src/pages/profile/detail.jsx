import React, { useState, useEffect, useMemo } from "react";
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
import { editProfile, getUserProfile } from "utils/https/user";
import Loader from "components/base/Loader";
import privateRoute from "utils/wrapper/private";
import Title from "utils/wrapper/title";

function Detail() {
  const dataUser = useSelector((state) => state.profile.data.data);

  const [userData, setUserData] = useState({
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
  });
  console.log(userData);
  const [dataUserTemp, setDataUserTemp] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [edit, setEdit] = useState(true);
  const token = useSelector((state) => state.auth.data.data.token);
  const id = useSelector((state) => state.auth.data.data.id);
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();

  const toEditPhone = () => {
    router.push("/profile/phoneNumber");
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const cancelUpdate = (e) => setUserData(dataUserTemp);

  const handleChange = (e) =>
    setUserData((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getUserProfile(id, token, controller);
        setUserData(data.data.data);
        setDataUserTemp(data.data.data);
        // console.log(setDataU);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProfile = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    // console.log(dataUser);
    const body = { firstName: userData.firstName, lastName: userData.lastName };
    console.log(body);
    try {
      const result = await editProfile(token, id, body, controller);
      if (result.status && result.status == 200) {
        dispatch(
          profileAction.getProfile({
            id,
            token,
            controller,
          })
        );
      }
      setIsLoading(false);
      setEdit(!edit);
      return swal("Success", result.data.msg, "success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Title title="Personal Info">
        {isLoading ? <Loader /> : <></>}

        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full  lg:w-[75%] shadow md:shadow-md py-16 rounded-[1.3rem]">
              <section className=" flex px-8 flex-col gap-6 mb-14">
                <div className=" text-dark font-bold text-xl">
                  <h3>Personal Information</h3>
                </div>
                <div className=" text-greyFont text-lg">
                  <p>
                    We got your personal information from the sign <br /> up
                    proccess. If you want to make changes on <br /> your
                    information,contact our support.
                  </p>
                </div>
              </section>
              <form
                className=" flex flex-col px-8 gap-[1.3rem]"
                onSubmit={updateProfile}
              >
                <div className=" shadow-sm flex flex-col md:flex-row  p-4 gap-3 rounded-[1.3rem] justify-between">
                  <div className=" flex flex-col">
                    <label htmlFor="firstName" className=" text-greyFont">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      className=" outline-none text-2xl font-bold text-dark bg-white w-full"
                      placeholder="Your First Name"
                      value={userData.firstName}
                      onChange={handleChange}
                      disabled={edit}
                    />
                  </div>
                  <div
                    className={`text-lg font-semibold cursor-pointer ${
                      edit ? "text-primary" : "text-[#f70000]"
                    }`}
                    onClick={handleEdit}
                  >
                    <p>{edit ? "Edit" : "Cancel"}</p>
                  </div>
                </div>
                <div className=" shadow-sm flex flex-col p-4 gap-3 rounded-[1.3rem]">
                  <label htmlFor="firstName" className=" text-greyFont">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className=" outline-none text-2xl font-bold text-dark bg-white w-full"
                    placeholder="Your Last Name"
                    value={userData.lastName}
                    onChange={handleChange}
                    disabled={edit}
                  />
                </div>
                <div className=" shadow-sm flex flex-col p-4 gap-3 rounded-[1.3rem]">
                  <label htmlFor="firstName" className=" text-greyFont">
                    Email
                  </label>
                  <input
                    type="text"
                    className=" outline-none text-2xl font-bold text-greyFont bg-white w-full"
                    placeholder="Your First Name"
                    disabled
                    value={dataUser.email}
                  />
                </div>
                <div className=" shadow-sm flex flex-col md:flex-row  p-4 gap-3 rounded-[1.3rem] justify-between">
                  <div className=" flex flex-col">
                    <label htmlFor="firstName" className=" text-greyFont">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className=" outline-none text-2xl font-bold text-dark bg-white w-full placeholder:text-lg"
                      placeholder="Your First Name"
                      disabled
                      value={
                        dataUser.noTelp === null
                          ? "Phone number required"
                          : `${dataUser.noTelp}`
                      }
                    />
                  </div>
                  <div
                    className=" text-primary text-lg font-semibold cursor-pointer "
                    onClick={toEditPhone}
                  >
                    <p>Manage</p>
                  </div>
                </div>
                {!edit && (
                  <div className="  mt-9 w-full justify-center items-center flex ">
                    <button
                      type="submit"
                      className=" bg-primary p-5 text-xl text-white font-bold rounded-lg w-[60%] justify-center items-center"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </section>
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(Detail);

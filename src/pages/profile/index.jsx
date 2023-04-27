import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import pp from "assets/vector/appp.png";
import place from "assets/background/bgHomeee.webp";
import { useRouter } from "next/router";
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import SideBar from "components/home/Sidebar";
import SideTogle from "components/base/SideTogle";
import { profileAction } from "redux/slices/profile";
import { ToastContainer, toast } from "react-toastify";
import { updateImage } from "utils/https/user";
import Loader from "components/base/Loader";
import Logout from "components/base/LogoutModal";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/private";

function Profile() {
  const inputFileRef = React.createRef();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const router = useRouter();
  const [profileUpdate, setProfileUpdate] = useState("");
  const [imageToDB, setImageToDB] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateRes, setUpdateRes] = useState();
  const [loading, setLoading] = useState(false);
  const stateUser = useSelector((state) => state.profile);
  const dataUser = useSelector((state) => state.profile.data.data);
  const id = useSelector((state) => state.auth.data.id);
  const token = useSelector((state) => state.auth.data.token);
  const [isOpen, setIsOpen] = useState(false);
  const linkCloud =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";
  const inputImage = () => {
    setIsUpdate(true);
    inputFileRef.current.click();
  };
  const toInfo = () => {
    router.push("/profile/detail");
  };

  const toChangePwd = () => {
    router.push("/profile/edit-password");
  };

  const handleLogout = () => {
    setIsOpen(true);
  };

  const toChangePin = () => {
    router.push("/profile/edit-pin");
  };
  const editImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileUpdate(imageUrl);
      setImageToDB(e.target.files[0]);
    }
  };
  const updateHandle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageToDB == "") {
      return toast.error("please input your image");
    }
    if (imageToDB) formData.append("image", imageToDB);
    setLoading(true);
    updateImage(formData, id, token, controller)
      .then((res) => {
        // dispatch(profileAction.getProfileThunk({ id, token, controller }));
        // toast.success(res.msg);
        swal("Success", "Update Success", "success");
        setIsUpdate(false);
        setUpdateRes(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return swal("Failed", err.response.data.msg, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(profileAction.getProfile({ id, token, controller }))
      .then((res) => {
        console.log("ppppp", res);
        // setProfileUpdate("");
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRes]);

  return (
    <>
      <Title title="Profile">
        {loading && (
          <div>
            <Loader />
          </div>
        )}
        {isOpen && <Logout isOpen={isOpen} setIsOpen={setIsOpen} />}

        <Header />
        <main>
          <section className=" md:bg-white lg:bg-[#FAFCFF] gap-5 w-full flex-col lg:flex-row px-4 md:px-2  lg:px-[3.4rem] xl:px-[8.4rem] pb-8 pt-10 lg:py-10 flex">
            <SideBar />
            <section className=" flex flex-col gap-5 w-full items-center lg:w-[75%] shadow md:shadow-md py-16 rounded-[1.3rem]">
              <section className=" flex flex-col justify-center w-full items-center gap-3">
                <div className=" flex flex-col justify-center items-center gap-3">
                  <div className=" w-20 h-20 rounded-[0.68rem] overflow-hidden">
                    {profileUpdate && (
                      <Image
                        src={profileUpdate}
                        width={60}
                        height={60}
                        alt="pp"
                        className=" w-full h-full object-cover"
                      />
                    )}
                    <Image
                      src={
                        dataUser.image == null
                          ? `${linkCloud}Fazzpay/example_qx2pf0.png`
                          : `${linkCloud}${dataUser.image}`
                      }
                      width={60}
                      height={60}
                      alt="pp"
                      className=" w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    name="image"
                    hidden={true}
                    ref={inputFileRef}
                    onChange={editImageHandler}
                  />
                  <div
                    className=" text-base text-[#7A7886] flex gap-1 justify-center items-center cursor-pointer"
                    // onClick={inputImage}
                  >
                    {isUpdate ? (
                      <div className="flex gap-8 justify-center items-center">
                        <button
                          className=" w-[6.375rem] h-9 text-center  rounded-md bg-[#F70000] text-white font-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsUpdate(false);
                            setProfileUpdate("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="w-max px-2 h-9 text-center rounded-md bg-primary text-white font-medium"
                          onClick={updateHandle}
                        >
                          Save Profile
                        </button>
                      </div>
                    ) : (
                      <div
                        className="text-base text-[#7A7886] flex gap-1 justify-center items-center cursor-pointer"
                        onClick={inputImage}
                      >
                        <i className=" text-sm bi bi-pencil"></i>
                        <p>Edit</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className=" text-dark font-bold text-2xl">
                  <p>
                    {dataUser.firstName} {dataUser.lastName}
                  </p>
                </div>
                <div className=" text-lg text-greyFont">
                  <p>{dataUser.noTelp}</p>
                </div>
              </section>
              <section className=" flex flex-col w-full justify-center items-center mt-14 gap-5">
                <div
                  className=" flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold  justify-between rounded-xl cursor-pointer hover:bg-greythirty "
                  onClick={toInfo}
                >
                  <p className=" text-lg text-dark leading-7">
                    Personal Information
                  </p>
                  <div className=" text-2xl">
                    <i className=" font-bold text-2xl text-greyFont bi bi-arrow-right"></i>
                  </div>
                </div>
                <div
                  className=" flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold justify-between rounded-xl cursor-pointer hover:bg-greythirty "
                  onClick={toChangePin}
                >
                  <p className=" text-lg text-dark leading-7 ">Change Pin</p>
                  <div className=" text-2xl">
                    <i className=" font-bold text-2xl text-greyFont bi bi-arrow-right"></i>
                  </div>
                </div>
                <div
                  className=" flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold justify-between rounded-xl cursor-pointer hover:bg-greythirty "
                  onClick={toChangePwd}
                >
                  <p className=" text-lg text-dark   leading-7">
                    Change Password
                  </p>
                  <div className=" text-2xl">
                    <i className=" font-bold text-2xl text-greyFont bi bi-arrow-right"></i>
                  </div>
                </div>
                <div
                  className=" flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold justify-between rounded-xl cursor-pointer hover:bg-greythirty "
                  onClick={handleLogout}
                >
                  <p className=" text-lg text-dark leading-7 ">Logout</p>
                </div>
              </section>
            </section>
          </section>
          <Footer />
        </main>
      </Title>
    </>
  );
}

export default privateRoute(Profile);

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/base/Loader";

const publicRoute = (WrappedComponent) => {
  const Auth = (props) => {
    // const dataArray = useSelector(
    //   (state) => state.auth.initialState.data.token
    // );
    const dataArray = useSelector((state) => state.auth.data);

    console.log(dataArray);
    const router = useRouter();
    useEffect(() => {
      if (dataArray) {
        router.push("/home");
      }
    }, [dataArray, router]);

    if (!dataArray) {
      return <WrappedComponent {...props} />;
    }
    return <Loader />;
  };

  return Auth;
};

export default publicRoute;

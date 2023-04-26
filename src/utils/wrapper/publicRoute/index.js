import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/base/Loader";

const publicRoute = (WrappedComponent) => {
  const Auth = (props) => {
    const data = useSelector((state) => state.auth.data);
    // console.log(data);
    const router = useRouter();

    if (data.token !== null) {
      router.push("/home");
      return <Loader />;
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  return Auth;
};

export default publicRoute;

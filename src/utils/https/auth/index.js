import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`;

export const login = (email, password) => {
  const url = `${baseUrl}/login`;
  return axios({
    method: "post",
    url,
    data: { email, password },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const register = (firstName, lastName, email, password) => {
  const url = `${baseUrl}/register`;
  return axios({
    method: "post",
    url,
    data: { firstName, lastName, email, password },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
export const forgot = (body, controller) => {
  const url = `${baseUrl}/forgot-password`;
  return axios.post(url, body, {
    signal: controller.signal,
  });
};

export const logout = (token, controller) => {
  const url = `${baseUrl}/logout`;
  return axios.post(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const resetPassword = (body, controller) => {
  const url = `${baseUrl}/reset-password`;
  return axios.patch(url, body, {
    signal: controller.signal,
  });
};

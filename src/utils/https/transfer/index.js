import axios from "axios";
const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const transferBalance = (body, token, controller) => {
  const url = `${baseUrl}/transaction/transfer`;
  return axios.post(url, body, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

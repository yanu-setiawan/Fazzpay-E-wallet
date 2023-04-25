import axios from "axios";
const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getHistory = (token, controller) => {
  const url = `${baseUrl}/transaction/history?page=1&limit=5&filter=MONTH`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

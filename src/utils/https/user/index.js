import axios from "axios";
import { headers } from "next.config";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const createPin = (pin, token, id) => {
  const url = `${baseUrl}/user/pin/${id}`;
  return axios.patch(
    url,
    { pin },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getDashBoard = (id, token, controller) => {
  const url = `${baseUrl}/dashboard/${id}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProfile = (id, token, controller) => {
  const url = `${baseUrl}/user/profile/${id}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const topUp = (token, body, controller) => {
  const url = `${baseUrl}/transaction/top-up`;
  return axios.post(url, body, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getContact = (page, search, token, controller) => {
  const url = `${baseUrl}/user?page=${page}&limit=4&search=${search}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cekPin = (getPin, token, controller) => {
  const url = `${baseUrl}/user/pin/${getPin}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateImage = (formData, id, token, controller) => {
  const url = `${baseUrl}/user/image/${id}`;
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editPassword = (token, id, body, controller) => {
  const url = `${baseUrl}/user/password/${id}`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editProfile = (token, id, body, controller) => {
  const url = `${baseUrl}/user/profile/${id}`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPin = (token, pin, controller) => {
  const url = `${baseUrl}/user/pin/${pin}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changePin = (id, token, pin, controller) => {
  const url = `${baseUrl}/user/pin/${id}`;
  return axios.patch(
    url,
    { pin },
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getHistories = (token, params, controller) => {
  const { page, limit, filter } = params;
  const url = `${baseUrl}/transaction/history?page=${page}&limit=${limit}&filter=${filter}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

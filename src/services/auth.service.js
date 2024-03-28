import { jsonAxiosInstance } from "./common/axiosInstances";

export const forgotPassword = async (inputval) => {
  const url = `/auth/forgot-password`;
  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, { email: inputval })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const login = async (data) => {
  const url = `/auth/login`;
  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const forgetPasswordOtp = async (data) => {
  const url = `auth/forgot-password-verify`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const loginOtp = async (data) => {
  const url = "auth/verify-otp";

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updatePassword = async (data) => {
  const url = `/auth/change-password`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

import { formDataAxiosInstance } from "./common/axiosInstances";

export const fileUpload = async (formData) => {
  const url = `/file-upload/`;

  return new Promise((resolve, reject) => {
    formDataAxiosInstance
      .post(url, formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

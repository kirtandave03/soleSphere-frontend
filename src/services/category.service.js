import { jsonAxiosInstance } from "./common/axiosInstances";

export const getCategories = async () => {
  const url = `/categories/`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

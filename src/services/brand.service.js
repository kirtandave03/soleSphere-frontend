import { jsonAxiosInstance } from "./common/axiosInstances";

export const getBrands = async () => {
  const url = `/brands/`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

import { jsonAxiosInstance } from "./common/axiosInstances";

export const getStats = async () => {
  const url = "/admin/dashboard/";

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

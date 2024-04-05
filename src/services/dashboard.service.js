import { jsonAxiosInstance } from "./common/axiosInstances";

export const getStats = async (rowsPerPage, page) => {
  const url = `/admin/dashboard/?limit=${rowsPerPage}&page=${page}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

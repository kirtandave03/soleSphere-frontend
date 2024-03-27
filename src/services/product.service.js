import {
  jsonAxiosInstance,
  formDataAxiosInstance,
} from "./common/axiosInstances";

export const getProducts = async (page, rowsPerPage, searchQuery) => {
  const url = `products/all-products?page=${page}&limit=${rowsPerPage}&q=${searchQuery}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// export const getDeletedProducts = async () => {

// }

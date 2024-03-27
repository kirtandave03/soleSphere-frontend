import { jsonAxiosInstance } from "./common/axiosInstances";

export const getProducts = async (page, rowsPerPage, searchQuery) => {
  const url = `products/all-products?page=${page}&limit=${rowsPerPage}&q=${searchQuery}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addProduct = async (productData) => {
  const url = `/admin/products/`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, productData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addVariant = async (variant) => {
  const url = `/admin/products/add-variant`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, variant)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getDeletedProducts = async (
  pageForDeleted,
  rowsPerPageForDeleted,
  searchDeletedQuery
) => {
  const url = `products/all-products?deleted=true&page=${pageForDeleted}&limit=${rowsPerPageForDeleted}&q=${searchDeletedQuery}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteProduct = async (productName) => {
  const url = `admin/products/${productName}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .delete(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

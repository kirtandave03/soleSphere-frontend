import { jsonAxiosInstance } from "./common/axiosInstances";

export const getProducts = async (page, rowsPerPage, searchQuery) => {
  const url = `/products/search?search=${searchQuery}&page=${page}&limit=${rowsPerPage}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllProducts = async (searchQuery) => {
  // const url = `/products/all-products?page=${page}&limit=${rowsPerPage}&q=${searchQuery}`;
  const url = `/products/all-products?search=${searchQuery}`;

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
  const url = `products/all-deleted-products?page=${pageForDeleted}&limit=${rowsPerPageForDeleted}&search=${searchDeletedQuery}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteProduct = async (productName) => {
  const url = `/admin/products/${productName}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .delete(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const restoreProduct = async (productId) => {
  const url = `/admin/products/${productId}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .put(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getProductDetails = async (productId) => {
  const url = `/products/product-detail?product_id=${productId}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editProduct = async (body) => {
  const url = `/admin/products/edit-product`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, body)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

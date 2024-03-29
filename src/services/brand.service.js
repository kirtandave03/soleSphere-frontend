import {
  formDataAxiosInstance,
  jsonAxiosInstance,
} from "./common/axiosInstances";

export const getBrands = async () => {
  const url = `/brands/`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addBrand = async (formData) => {
  const url = `/brands`;

  return new Promise((resolve, reject) => {
    formDataAxiosInstance
      .post(url, formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateBrand = async (formData) => {
  const url = `/brands`;

  return new Promise((resolve, reject) => {
    formDataAxiosInstance
      .put(url, formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteBrand = async (brand) => {
  const url = `/brands`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .delete(url, { data: brand })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

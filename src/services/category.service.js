import {
  jsonAxiosInstance,
  formDataAxiosInstance,
} from "./common/axiosInstances";

export const getCategories = async () => {
  const url = `/categories/`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addCategory = async (category) => {
  const url = `/categories`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .post(url, category)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateCategory = async (category) => {
  const url = `/categories`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .put(url, category)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteCategory = async (category) => {
  const url = `/categories`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .delete(url, { data: category })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

import { jsonAxiosInstance } from "./common/axiosInstances";

export const getUsers = async (searchQuery, rowsPerPage, page) => {
  const url = `/admin/users?q=${searchQuery}&limit=${rowsPerPage}&page=${page}`;
  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getDeletedUsers = async (
  searchQueryDeleted,
  rowsPerPageForDeleted,
  pageForDeleted
) => {
  const url = `/admin/users?q=${searchQueryDeleted}&deleted=${true}&limit=${rowsPerPageForDeleted}&page=${pageForDeleted}`;
  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteUser = async (id) => {
  const url = `/admin/users/${id}`;
  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .delete(url)
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

export const restoreUser = async (_id) => {
  const url = `/admin/users/${_id}`;
  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .put(url)
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

import { jsonAxiosInstance } from "./common/axiosInstances";

export const getOrders = async (limit, page) => {
  const url = `/admin/orders/?limit=${limit}&page=${page}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getOrderDetails = async (orderId) => {
  const url = `/admin/orders/${orderId}`;

  return new Promise((resolve, reject) => {
    jsonAxiosInstance
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

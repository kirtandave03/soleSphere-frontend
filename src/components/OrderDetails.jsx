import React from "react";
import convertFlutterToHexFormat from "../utils/convertFlutterToHexFormat";

function OrderDetails({ order, setDetails }) {
  return (
    <div className="w-2/5 absolute right-0 top-0 h-full flex-col justify-between bg-white p-4 shadow-lg transition-all duration-500">
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">#{order._id}</h2>
          <button
            className="text-red-500 text-xl"
            onClick={() => setDetails(null)}
          >
            X
          </button>
        </div>
        <h4 className="font-semibold">Order details</h4>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold">Created at</h4>
          <p>{order.createdAt.slice(0, 10)}</p>
        </div>
        <div>
          <h4 className="font-semibold">Payment</h4>
          <p>{order.paymentStatus}</p>
        </div>
        <div>
          <h4 className="font-semibold">Status</h4>
          <p>{order.orderStatus}</p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex-col">
        <h4 className="font-semibold">Customer</h4>
        <p>{order.user._id}</p>
        <p>{order.user.email}</p>
      </div>
      <hr className="my-2" />
      <div>
        <h4 className="font-semibold">Items</h4>
        {order.products.map((product, index) => (
          <div key={index} className="px-3 flex justify-between">
            <div className="flex gap-7">
              <img
                src={product.image_url}
                alt=""
                className="w-15 h-20 object-cover rounded-full"
              />
              <div className="h-20 flex-col justify-between">
                <div>{product.productName}</div>
                <div className="flex gap-2 items-center">
                  <div
                    style={{
                      backgroundColor: `${convertFlutterToHexFormat(
                        product.color
                      )}`,
                      width: "1.25rem",
                      height: "1.25rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div>{product.size}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-7">
              <div>{product.quantity}</div>
              <div>₹{product.discounted_price}</div>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-2" />
      <div>
        <h4 className="font-semibold">Payment</h4>
        <div className="flex justify-between">
          <div>Subtotal: </div>
          <div>
            ₹
            {order.totalAmount > 539
              ? order.totalAmount - 40
              : order.totalAmount}
          </div>
        </div>
        <div className="flex justify-between">
          <div>Discount: </div>
          <div>- ₹{order.totalDiscount}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping cost: </div>
          <div>₹{order.totalDiscount >= 500 ? 0 : 40}</div>
        </div>
        <div className="flex justify-between font-semibold">
          <div>Total: </div>₹{order.totalAmount - order.totalDiscount}
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="w-full flex justify-between"></div>
          <div className="w-full flex-col"></div>
        </div>
        <hr className="my-2" />
      </div>
    </div>
  );
}

export default OrderDetails;

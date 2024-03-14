import React from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";

function AddProducts() {
  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="flex-grow">
          <div className="p-4">
            <h1 className="font-bold mx-2 mb-2 text-lg">Add Products</h1>
            <div className="flex">
              <div className="ml-8 w-1/2 flex flex-col gap-4">
                <input
                  className="bg-input-bg border-input-bg"
                  type="text"
                  placeholder="Product Name"
                />
                <textarea
                  className="bg-input-bg border-input-bg"
                  name="shortDescription"
                  placeholder="Short Description"
                  rows={3}
                  id=""
                ></textarea>
                <input
                  className="bg-input-bg border-input-bg"
                  type="text"
                  placeholder="Categories"
                />
                <input
                  className="bg-input-bg border-input-bg"
                  type="text"
                  placeholder="Brand"
                />
                <div className="flex gap-2">
                  <label className="font-semibold" htmlFor="size">
                    Size
                  </label>
                  <input
                    className="bg-input-bg border-input-bg"
                    type="number"
                    placeholder="10"
                  />
                  <select
                    className="bg-input-bg border-input-bg"
                    id="sizeType"
                    name="sizeType"
                  >
                    <option value="UK">UK</option>
                    <option value="US">US</option>
                    <option value="EU">EU</option>
                  </select>
                </div>
                <input
                  className="bg-input-bg border-input-bg"
                  type="text"
                  placeholder="Colours"
                />
                <div className="flex gap-2">
                  <label className="font-semibold" htmlFor="pictures">
                    Upload Pictures
                  </label>
                  <input
                    className="bg-input-bg border-input-bg"
                    type="file"
                    id="pictures"
                    name="pictures"
                    accept="image/*"
                    multiple
                  />
                </div>
                <div className="flex gap-2">
                  <label className="font-semibold" htmlFor="actualPrice">
                    Actual Price
                  </label>
                  <input
                    className="bg-input-bg border-input-bg"
                    type="text"
                    id="actualPrice"
                    name="actualPrice"
                  />
                </div>
                <div className="flex gap-2">
                  <label className="font-semibold" htmlFor="discountedPrice">
                    Discounted Price
                  </label>
                  <input
                    className="bg-input-bg border-input-bg"
                    type="text"
                    id="discountedPrice"
                    name="discountedPrice"
                  />
                </div>
                <div className="flex gap-2">
                  <label className="font-semibold" htmlFor="stock">
                    Stock
                  </label>
                  <input
                    className="bg-input-bg border-input-bg"
                    type="number"
                    name="stock"
                    id="stock"
                  />
                </div>
              </div>
              <div className="ml-8 w-1/2 flex flex-col gap-4">
                <label className="font-semibold" htmlFor="discount">
                  Discount
                </label>
                <div className="bg-input-bg p-2">
                  <div className="flex gap-2">
                    <label htmlFor="amount">Amount</label>
                    <input
                      className="bg-[#dedede] border-input-bg"
                      type="number"
                      name="amount"
                      id="amount"
                      max={100}
                      min={0}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      className="bg-input-bg border-input-bg"
                      type="date"
                      name="startDate"
                      id="startDate"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      className="bg-input-bg border-input-bg"
                      type="date"
                      name="endDate"
                      id="endDate"
                    />
                  </div>
                </div>
                <textarea
                  className="bg-input-bg border-input-bg"
                  name="longDescription"
                  placeholder="Long Description"
                  id=""
                  cols={6}
                  rows={8}
                ></textarea>
                <input
                  className="bg-input-bg border-input-bg"
                  type="text"
                  placeholder="Material"
                />
                <div className="flex gap-2">
                  <label className="font-semibold" htmlFor="closureType">
                    Closure Type
                  </label>
                  <select
                    className="bg-input-bg border-input-bg"
                    name="closureType"
                    id="closureType"
                  >
                    <option value="Lace Up">Lace Up</option>
                    <option value="Velcro Straps">Velcro Straps</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white font-bold py-2 px-4 rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;

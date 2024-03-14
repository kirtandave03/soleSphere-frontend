import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";

function AddCategoriesAndBrands() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const categoryHandler = async (event) => {
    setCategory(event.target.value);
  };

  const brandHandler = async (event) => {
    setBrand(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="flex-grow">
          <div className="p-4">
            <h1 className="font-bold mx-2 mb-2 text-lg">
              Add Categories and Brands
            </h1>
            <div className="ml-4 flex flex-col gap-12">
              <div>
                <h2 className="font-semibold mb-4">Add Category</h2>
                <div className="flex flex-col gap-6">
                  <input
                    className="bg-input-bg border-input-bg"
                    type="text"
                    placeholder="Category Name"
                    value={category}
                  />
                  <button
                    onClick={categoryHandler}
                    className="bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white font-bold py-1 px-4 rounded"
                  >
                    Add Category
                  </button>
                </div>
              </div>
              <div>
                <h2 className="font-semibold mb-4">Add Brand</h2>
                <div className="flex flex-col gap-6">
                  <input
                    className="bg-input-bg border-input-bg"
                    type="text"
                    placeholder="Brand Name"
                  />
                  <input
                    className="bg-input-bg border-input-bg"
                    type="file"
                    accept="image/*"
                    placeholder="Upload Brand Logo"
                    value={brand}
                  />
                  <button
                    onClick={brandHandler}
                    className="bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white font-bold py-1 px-4 rounded"
                  >
                    Add Brand
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoriesAndBrands;

import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddCategoriesAndBrands() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxODJmMGE0ODRlNjcwYzY4ODcwNTciLCJlbWFpbCI6ImtpcnRhbmRhdmVAYm9zY3RlY2hsYWJzLmNvbSIsImlhdCI6MTcwOTI3NzkzNn0.apiL-taCwpQs_6KFYYbgMx-ATLNd3RMQQG8YjlHzC68";
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("add");
  const [selectedBrandTab, setSelectedBrandTab] = useState("add");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandAddIcon, setBrandAddIcon] = useState(null);
  const [brandUpdIcon, setBrandUpdIcon] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const fetchCategories = async () => {
      try {
        const responseCatData = await fetch(
          "https://solesphere-backend.onrender.com/api/v1/categories",
          requestOptions
        );

        const responseData = await responseCatData.json();
        const fetchedCategories = responseData.data.categories;

        setCategories(fetchedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBrands = async () => {
      try {
        const responseBrandData = await fetch(
          "https://solesphere-backend.onrender.com/api/v1/brands/",
          requestOptions
        );

        const responseData = await responseBrandData.json();
        const fetchedBrands = responseData.data.brands;

        setBrands(fetchedBrands);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const onAddCatSubmit = async (data) => {
    console.log("i reached onAddCatSubmit");
    const { newCategory1 } = data;

    const headers = {
      "Content-Type": "application/json",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/categories",
        { category: newCategory1 },
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Category added successfully");
      }
      if (response.status === 400) {
        setError("noCat", {
          message: "Category is required!",
        });
      }
    } catch (error) {
      console.error(error);
      //navigate("/error");
    }
  };

  const onUpdCatSubmit = async (data) => {
    const { category2, newCategory2 } = data;
    const headers = {
      "Content-Type": "application/json",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.put(
        "https://solesphere-backend.onrender.com/api/v1/categories",
        { oldCategory: category2, category: newCategory2 },
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Category updated successfully");
      }
      if (response.status === 404) {
        setError("CatNF", {
          message: "Category not found!",
        });
      }
    } catch (error) {
      console.error(error);
      //navigate("/error");
    }
  };

  const onDelCatSubmit = async (data) => {
    const { category3 } = data;
    const headers = {
      "Content-Type": "application/json",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.delete(
        "https://solesphere-backend.onrender.com/api/v1/categories",
        {
          headers,
          data: { category: category3 },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Category deleted successfully");
      }
      if (response.status === 404) {
        setError("delCat", {
          message: "Category not found!",
        });
      }
    } catch (error) {
      console.error(error);
      //navigate("/error");
    }
  };

  const onAddBrandSubmit = async (data) => {
    const { newBrand1, newBrandIcon1 } = data;
    const formData = new FormData();
    formData.append("brand", newBrand1);
    formData.append("brandIcon", newBrandIcon1[0]);

    const headers = {
      "Content-Type": "multipart/form-data",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/brands/",
        formData,
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Brand added successfully");
      }
      if (response.status === 400) {
        setError("addBrand", {
          message: "Failed to add brand. Please try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      // navigate("/error");
    }
  };

  const onUpdBrandSubmit = async (data) => {
    const { brand2, newBrand2, newBrandIcon2 } = data;
    const formData = new FormData();
    formData.append("oldBrand", brand2);
    formData.append("brand", newBrand2);
    formData.append("brandIcon", newBrandIcon2[0]);

    const headers = {
      "Content-Type": "multipart/form-data",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.put(
        "https://solesphere-backend.onrender.com/api/v1/brands/",
        formData,
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Brand updated successfully");
      }
      if (response.status === 400) {
        setError("noBrand", {
          message: `No such brand exists which needs to update`,
        });
      }
      if (response.status === 500) {
        setError("ser", {
          message: `Internal Server Error`,
        });
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const onDelBrandSubmit = async (data) => {
    const { brand3 } = data;
    const headers = {
      "Content-Type": "application/json",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.delete(
        "https://solesphere-backend.onrender.com/api/v1/brands/",
        {
          headers,
          data: { brand: brand3 }, // Pass data object here
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Brand deleted successfully");
      }
      if (response.status === 404) {
        setError("BrandNF", {
          message: "Brand not found!",
        });
      }
    } catch (error) {
      console.error(error);
      //navigate("/error");
    }
  };

  const handleAddFileChange = (event) => {
    setBrandAddIcon(event.target.files[0]);
  };

  const handleUpdFileChange = (event) => {
    setBrandUpdIcon(event.target.files[0]);
  };

  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center">
          <div className="p-4">
            <h1 className="font-bold mb-4 text-lg text-center">
              Categories and Brands
            </h1>
            <div className="mx-auto bg-white rounded-lg shadow w-full max-w-2xl">
              <div className="flex justify-between p-4">
                <div className="div1 w-1/2 mr-auto ml-auto">
                  <h2 className="text-lg mb-2 text-center font-semibold">
                    Category Fields
                  </h2>
                  <div className="tabs flex justify-center gap-3">
                    <button
                      className={`tab-button ${
                        selectedCategoryTab === "add"
                          ? "active border-b-2 border-[#4880ff]"
                          : ""
                      }`}
                      onClick={() => setSelectedCategoryTab("add")}
                    >
                      <span>Add</span>
                    </button>
                    <button
                      className={`tab-button ${
                        selectedCategoryTab === "update"
                          ? "active border-b-2 border-[#4880ff]"
                          : ""
                      }`}
                      onClick={() => setSelectedCategoryTab("update")}
                    >
                      <span>Update</span>
                    </button>
                    <button
                      className={`tab-button ${
                        selectedCategoryTab === "delete"
                          ? "active border-b-2 border-[#4880ff]"
                          : ""
                      }`}
                      onClick={() => setSelectedCategoryTab("delete")}
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                  <div className="mt-4 mx-auto w-full max-w-sm">
                    {selectedCategoryTab === "add" && (
                      <form
                        onSubmit={handleSubmit(onAddCatSubmit)}
                        className="flex flex-col gap-3"
                      >
                        <input
                          type="text"
                          placeholder="Category Name"
                          value={watch("newCategory1")}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...register("newCategory1", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                          })}
                        />
                        <input
                          type="submit"
                          value="Add Category"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        />
                        {errors.noCat && (
                          <div className="text-red-600 text-sm">
                            {errors.noCat.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedCategoryTab === "update" && (
                      <form
                        onSubmit={handleSubmit(onUpdCatSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {categories.length > 0 && (
                          <select
                            name="category"
                            id="category"
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            {...register("category2", {
                              required: {
                                value: true,
                                message: "This field is required ",
                              },
                            })}
                          >
                            {categories.map((category) => (
                              <option
                                key={category._id}
                                value={category.category}
                              >
                                {category.category}
                              </option>
                            ))}
                          </select>
                        )}
                        <input
                          type="text"
                          name="updatedCat"
                          id="updatedCat"
                          value={watch("newCategory2")}
                          placeholder="Updated Category"
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...register("newCategory2", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                          })}
                        />
                        <input
                          type="submit"
                          value="Update Category"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        />
                        {errors.CatNF && (
                          <div className="text-red-600 text-sm">
                            {errors.CatNF.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedCategoryTab === "delete" && (
                      <form
                        onSubmit={handleSubmit(onDelCatSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {categories.length > 0 && (
                          <select
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            name="category"
                            id="category"
                            {...register("category3", {
                              required: {
                                value: true,
                                message: "This field is required ",
                              },
                            })}
                          >
                            {categories.map((category) => (
                              <option
                                key={category._id}
                                value={category.category}
                              >
                                {category.category}
                              </option>
                            ))}
                          </select>
                        )}
                        <input
                          type="submit"
                          value="Delete Category"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        />
                        {errors.delCat && (
                          <div className="text-red-600 text-sm">
                            {errors.delCat.message}
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="mx-auto bg-white rounded-lg shadow w-full max-w-2xl">
              <div className="flex justify-between p-4">
                <div className="div2 w-1/2 mr-auto ml-auto">
                  <h2 className="text-lg mb-2 text-center font-semibold">
                    Brand Fields
                  </h2>
                  <div className="mb-4 tabs flex justify-center gap-3">
                    <button
                      className={`tab-button ${
                        selectedBrandTab === "add"
                          ? "active border-b-2 border-[#4880ff]"
                          : ""
                      }`}
                      onClick={() => setSelectedBrandTab("add")}
                    >
                      <span>Add</span>
                    </button>
                    <button
                      className={`tab-button ${
                        selectedBrandTab === "update"
                          ? "active border-b-2 border-[#4880ff]"
                          : ""
                      }`}
                      onClick={() => setSelectedBrandTab("update")}
                    >
                      <span>Update</span>
                    </button>
                    <button
                      className={`tab-button ${
                        selectedBrandTab === "delete"
                          ? "active border-b-2 border-[#4880ff]"
                          : ""
                      }`}
                      onClick={() => setSelectedBrandTab("delete")}
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                  <div className="mt-4 mx-auto w-full max-w-sm">
                    {selectedBrandTab === "add" && (
                      <form
                        onSubmit={handleSubmit(onAddBrandSubmit)}
                        className="flex flex-col gap-3"
                      >
                        <input
                          type="text"
                          placeholder="Brand Name"
                          value={watch("newBrand1")}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...register("newBrand1", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                          })}
                        />
                        <input
                          type="file"
                          name="brandLogo"
                          id="brandLogo"
                          accept="image/*"
                          multiple={false}
                          onChange={handleAddFileChange}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...register("newBrandIcon1", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                        />
                        <input
                          type="submit"
                          value="Add Brand"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        />
                        {errors.addBrand && (
                          <div className="text-red-600 text-sm">
                            {errors.addBrand.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedBrandTab === "update" && (
                      <form
                        onSubmit={handleSubmit(onUpdBrandSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {brands.length > 0 && (
                          <select
                            name="brand"
                            id="brand"
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            {...register("brand2", {
                              required: {
                                value: true,
                                message: "This field is required ",
                              },
                            })}
                          >
                            {brands.map((brand) => (
                              <option key={brand._id} value={brand.brand}>
                                {brand.brand}
                              </option>
                            ))}
                          </select>
                        )}
                        <input
                          type="text"
                          name="updatedBrand"
                          id="updatedBrand"
                          placeholder="Updated Brand"
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...register("newBrand2", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                          })}
                        />
                        <input
                          type="file"
                          name="updatedBrandLogo"
                          id="updatedBrandLogo"
                          accept="image/*"
                          multiple={false}
                          onChange={handleUpdFileChange}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...register("newBrandIcon2", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                        />
                        <input
                          type="submit"
                          value="Update Brand"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        />
                        {errors.noBrand && (
                          <div className="text-red-600 text-sm">
                            {errors.noBrand.message}
                          </div>
                        )}
                        {errors.ser && (
                          <div className="text-red-600 text-sm">
                            {errors.ser.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedBrandTab === "delete" && (
                      <form
                        onSubmit={handleSubmit(onDelBrandSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {brands.length > 0 && (
                          <select
                            name="brand"
                            id="brand"
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            {...register("brand3", {
                              required: {
                                value: true,
                                message: "This field is required ",
                              },
                            })}
                          >
                            {brands.map((brand) => (
                              <option key={brand._id} value={brand.brand}>
                                {brand.brand}
                              </option>
                            ))}
                          </select>
                        )}
                        <input
                          type="submit"
                          value="Delete Brand"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        />
                        {errors.BrandNF && (
                          <div className="text-red-600 text-sm">
                            {errors.BrandNF.message}
                          </div>
                        )}
                      </form>
                    )}
                  </div>
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

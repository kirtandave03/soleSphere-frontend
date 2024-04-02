import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { useForm } from "react-hook-form";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/category.service";
import {
  getBrands,
  addBrand,
  deleteBrand,
  updateBrand,
} from "../services/brand.service";
import Alert from "@mui/material/Alert";

function AddCategoriesAndBrands() {
  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    setError: setErrorCategory,
    watch: watchCategory,
    formState: { errors: errorsCategory, isSubmitting: isSubmittingCategory },
  } = useForm();

  const {
    register: registerBrand,
    handleSubmit: handleSubmitBrand,
    setError: setErrorBrand,
    watch: watchBrand,
    formState: { errors: errorsBrand, isSubmitting: isSubmittingBrand },
  } = useForm();
  const accessToken = localStorage.getItem("auth-token");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("add");
  const [selectedBrandTab, setSelectedBrandTab] = useState("add");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandAddIcon, setBrandAddIcon] = useState(null);
  const [brandUpdIcon, setBrandUpdIcon] = useState(null);
  const [noCategories, setNoCategories] = useState(false);
  const [noBrands, setNoBrands] = useState(false);
  const [catExists, setCatExists] = useState(false);
  const [brandExists, setBrandExists] = useState(false);
  const [ISR, setISR] = useState(false);
  const [catAdd, setCatAdd] = useState(false);
  const [catUpd, setCatUpd] = useState(false);
  const [catDel, setCatDel] = useState(false);
  const [brandAdd, setBrandAdd] = useState(false);
  const [brandUpd, setBrandUpd] = useState(false);
  const [brandDel, setBrandDel] = useState(false);

  const fetchCategories = async () => {
    try {
      const responseCatData = await getCategories();
      setCategories(responseCatData.data.data.categories);
    } catch (error) {
      setNoCategories(true);
      console.error(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const responseBrandData = await getBrands();
      setBrands(responseBrandData.data.data.brands);
    } catch (error) {
      setNoBrands(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const onAddCatSubmit = async (data) => {
    console.log("i reached onAddCatSubmit");
    const newCategory1 = data.newCategory1;
    const catToSend = { category: newCategory1 };

    try {
      const response = await addCategory(catToSend);

      console.log(response.status);

      if (response.status === 200) {
        fetchCategories();
        setCatAdd(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setCatExists(true);
        // alert("Category field is required! or Category entered already exists");
      }
      console.error(error);
      //navigate("/error");
    }
  };

  const onUpdCatSubmit = async (data) => {
    const { category2, newCategory2 } = data;

    try {
      const response = await updateCategory({
        oldCategory: category2,
        category: newCategory2,
      });

      console.log(response.status);

      if (response.status === 200) {
        fetchCategories();
        setCatUpd(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setCatExists(true);
      }
      console.error(error);
      //navigate("/error");
    }
  };

  const onDelCatSubmit = async (data) => {
    const { category3 } = data;

    try {
      const response = await deleteCategory({ category: category3 });

      console.log(response.status);

      if (response.status === 200) {
        fetchCategories();
        setCatDel(true);
      }
    } catch (error) {
      console.error(error);
      //navigate("/error");
    }
  };

  const onAddBrandSubmit = async (data) => {
    console.log("onAddBrandSubmit");
    const { newBrand1, newBrandIcon1 } = data;
    const formData = new FormData();
    formData.append("brand", newBrand1);
    formData.append("brandIcon", newBrandIcon1[0]);

    try {
      const response = await addBrand(formData);

      console.log(response.status);

      if (response.status === 200) {
        fetchBrands();
        setBrandAdd(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setBrandExists(true);
      }
      if (error.response.status === 500) {
        setISR(true);
      }
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

    try {
      const response = await updateBrand(formData);

      console.log(response.status);

      if (response.status === 200) {
        fetchBrands();
        setBrandUpd(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setBrandExists(true);
      }
      if (error.response.status === 500) {
        setISR(true);
      }
      console.error(error);
      // navigate("/error");
    }
  };

  const onDelBrandSubmit = async (data) => {
    const { brand3 } = data;

    try {
      const response = await deleteBrand({ brand: brand3 });

      console.log(response.status);

      if (response.status === 200) {
        fetchBrands();
        setBrandDel(true);
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

  useEffect(() => {
    let timer;
    if (ISR) {
      timer = setTimeout(() => {
        setISR(false);
      }, 5000);
    }

    if (brandExists) {
      timer = setTimeout(() => {
        setBrandExists(false);
      }, 5000);
    }

    if (catExists) {
      timer = setTimeout(() => {
        setCatExists(false);
      }, 5000);
    }

    if (noBrands) {
      timer = setTimeout(() => {
        setNoBrands(false);
      }, 5000);
    }

    if (noCategories) {
      timer = setTimeout(() => {
        setNoCategories(false);
      }, 5000);
    }

    if (catAdd) {
      timer = setTimeout(() => {
        setCatAdd(false);
      }, 5000);
    }

    if (brandAdd) {
      timer = setTimeout(() => {
        setBrandAdd(false);
      }, 5000);
    }

    if (catUpd) {
      timer = setTimeout(() => {
        setCatUpd(false);
      }, 5000);
    }

    if (brandUpd) {
      timer = setTimeout(() => {
        setBrandUpd(false);
      }, 5000);
    }

    if (catDel) {
      timer = setTimeout(() => {
        setCatDel(false);
      }, 5000);
    }

    if (brandDel) {
      timer = setTimeout(() => {
        setBrandDel(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [
    ISR,
    brandExists,
    catExists,
    noBrands,
    noCategories,
    catAdd,
    catDel,
    catUpd,
    brandAdd,
    brandDel,
    brandUpd,
  ]);

  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center">
          <div className="w-full flex justify-center items-center">
            {noCategories && (
              <Alert
                severity="error"
                className="w-full"
                onClose={() => {
                  setNoCategories(false);
                }}
              >
                Error fetching categories!
              </Alert>
            )}
            {noBrands && (
              <Alert
                severity="error"
                className="w-full"
                onClose={() => {
                  setNoBrands(false);
                }}
              >
                Error fetching brands!
              </Alert>
            )}
            {catExists && (
              <Alert
                severity="error"
                className="w-full"
                onClose={() => {
                  setCatExists(false);
                }}
              >
                Category entered alredy exists!
              </Alert>
            )}
            {brandExists && (
              <Alert
                severity="error"
                className="w-full"
                onClose={() => {
                  setBrandExists(false);
                }}
              >
                Brand name entered alredy exists!
              </Alert>
            )}
            {ISR && (
              <Alert
                severity="error"
                className="w-full"
                onClose={() => {
                  setISR(false);
                }}
              >
                Internal Server Error or error while uploading file!
              </Alert>
            )}
            {catAdd && (
              <Alert
                severity="success"
                className="w-full"
                onClose={() => {
                  setCatAdd(false);
                }}
              >
                Category Added successfully :)
              </Alert>
            )}
            {catUpd && (
              <Alert
                severity="success"
                className="w-full"
                onClose={() => {
                  setCatUpd(false);
                }}
              >
                Category updated successfully :)
              </Alert>
            )}
            {catDel && (
              <Alert
                severity="success"
                className="w-full"
                onClose={() => {
                  setCatDel(false);
                }}
              >
                Category Deleted successfully :)
              </Alert>
            )}
            {brandAdd && (
              <Alert
                severity="success"
                className="w-full"
                onClose={() => {
                  setBrandAdd(false);
                }}
              >
                Brand Added successfully :)
              </Alert>
            )}
            {brandUpd && (
              <Alert
                severity="success"
                className="w-full"
                onClose={() => {
                  setBrandUpd(false);
                }}
              >
                Brand updated successfully :)
              </Alert>
            )}
            {brandDel && (
              <Alert
                severity="success"
                className="w-full"
                onClose={() => {
                  setBrandDel(false);
                }}
              >
                Brand Deleted successfully :)
              </Alert>
            )}
          </div>
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
                        onSubmit={handleSubmitCategory(onAddCatSubmit)}
                        className="flex flex-col gap-3"
                      >
                        <input
                          type="text"
                          placeholder="Category Name"
                          value={watchCategory("newCategory1")}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...registerCategory("newCategory1", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "Category name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Category name cannot exceed 50 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9\s]+$/,
                              message:
                                "Category name must contain only letters, numbers, and spaces",
                            },
                          })}
                        />
                        {errorsCategory.newCategory1 && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsCategory.newCategory1.message}
                          </div>
                        )}
                        <button
                          onClick={handleSubmitCategory(onAddCatSubmit)}
                          disabled={isSubmittingCategory}
                          type="button"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        >
                          Add Category
                        </button>
                        {errorsCategory.noCat && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsCategory.noCat.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedCategoryTab === "update" && (
                      <form
                        onSubmit={handleSubmitCategory(onUpdCatSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {categories.length > 0 && (
                          <select
                            name="category"
                            id="category"
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            {...registerCategory("category2", {
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
                          value={watchCategory("newCategory2")}
                          placeholder="Updated Category"
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...registerCategory("newCategory2", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "Category name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Category name cannot exceed 50 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9\s]+$/,
                              message:
                                "Category name must contain only letters, numbers, and spaces",
                            },
                          })}
                        />
                        {errorsCategory.newCategory2 && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsCategory.newCategory2.message}
                          </div>
                        )}
                        <button
                          disabled={isSubmittingCategory}
                          onClick={handleSubmitCategory(onUpdCatSubmit)}
                          type="button"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        >
                          Update Category
                        </button>
                        {errorsCategory.CatNF && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsCategory.CatNF.message}
                          </div>
                        )}
                        {errorsCategory.catExists && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsCategory.catExists.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedCategoryTab === "delete" && (
                      <form
                        onSubmit={handleSubmitCategory(onDelCatSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {categories.length > 0 && (
                          <select
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            name="category"
                            id="category"
                            {...registerCategory("category3", {
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
                        <button
                          disabled={isSubmittingCategory}
                          onClick={handleSubmitCategory(onDelCatSubmit)}
                          type="button"
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        >
                          Delete Category
                        </button>
                        {errorsCategory.delCat && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsCategory.delCat.message}
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
                        onSubmit={handleSubmitBrand(onAddBrandSubmit)}
                        className="flex flex-col gap-3"
                      >
                        <input
                          type="text"
                          placeholder="Brand Name"
                          value={watchBrand("newBrand1")}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...registerBrand("newBrand1", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "Brand name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message: "Brand name cannot exceed 50 characters",
                            },
                            pattern: {
                              value: /^[\p{L}\d\s\-&'()]+$/u,
                              message:
                                "Brand name can only contain letters, numbers, spaces, hyphens, ampersands, apostrophes, and parentheses.",
                            },
                          })}
                        />
                        {errorsBrand.newBrand1 && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.newBrand1.message}
                          </div>
                        )}
                        <input
                          type="file"
                          name="brandLogo"
                          id="brandLogo"
                          accept="image/*"
                          multiple={false}
                          onChange={handleAddFileChange}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...registerBrand("newBrandIcon1", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                        />
                        {errorsBrand.newBrandIcon1 && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.newBrandIcon1.message}
                          </div>
                        )}
                        <button
                          type="button"
                          disabled={isSubmittingBrand}
                          onClick={handleSubmitBrand(onAddBrandSubmit)}
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        >
                          Add Brand
                        </button>
                        {errorsBrand.addBrand && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.addBrand.message}
                          </div>
                        )}
                        {errorsBrand.ISE && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.ISE.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedBrandTab === "update" && (
                      <form
                        onSubmit={handleSubmitBrand(onUpdBrandSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {brands.length > 0 && (
                          <select
                            name="brand"
                            id="brand"
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            {...registerBrand("brand2", {
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
                          {...registerBrand("newBrand2", {
                            required: {
                              value: true,
                              message: "This field is required ",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "Brand name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message: "Brand name cannot exceed 50 characters",
                            },
                            pattern: {
                              value: /^[\p{L}\d\s\-&'()]+$/u,
                              message:
                                "Brand name can only contain letters, numbers, spaces, hyphens, ampersands, apostrophes, and parentheses.",
                            },
                          })}
                        />
                        {errorsBrand.newBrand2 && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.newBrand2.message}
                          </div>
                        )}
                        <input
                          type="file"
                          name="updatedBrandLogo"
                          id="updatedBrandLogo"
                          accept="image/*"
                          multiple={false}
                          onChange={handleUpdFileChange}
                          className="bg-input-bg border-input-bg placeholder:text-center"
                          {...registerBrand("newBrandIcon2", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                        />
                        {errorsBrand.newBrandIcon2 && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.newBrandIcon2.message}
                          </div>
                        )}
                        <button
                          type="button"
                          disabled={isSubmittingBrand}
                          onClick={handleSubmitBrand(onUpdBrandSubmit)}
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        >
                          Update Brand
                        </button>
                        {errorsBrand.noBrand && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.noBrand.message}
                          </div>
                        )}
                        {errorsBrand.ser && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.ser.message}
                          </div>
                        )}
                        {errorsBrand.brandExists && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.brandExists.message}
                          </div>
                        )}
                      </form>
                    )}
                    {selectedBrandTab === "delete" && (
                      <form
                        onSubmit={handleSubmitBrand(onDelBrandSubmit)}
                        className="flex flex-col gap-3"
                      >
                        {brands.length > 0 && (
                          <select
                            name="brand"
                            id="brand"
                            className="bg-input-bg border-input-bg placeholder:text-center"
                            {...registerBrand("brand3", {
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
                        <button
                          type="button"
                          disabled={isSubmittingBrand}
                          onClick={handleSubmitBrand(onDelBrandSubmit)}
                          className="button bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                        >
                          Delete Brand
                        </button>
                        {errorsBrand.BrandNF && (
                          <div className="text-red-600 text-sm text-center">
                            {errorsBrand.BrandNF.message}
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

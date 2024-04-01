import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import Topbar from "../layouts/TopBar";
import { useForm, useWatch } from "react-hook-form";
import { getBrands } from "../services/brand.service";
import { getCategories } from "../services/category.service";
import { fileUpload } from "../services/fileupload.service";
import { addProduct } from "../services/product.service";
import convertHexToFlutterFormat from "../utils/convertHexToFlutterFormat";

const AddProducts = () => {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const getAllBrands = async () => {
    const brands = await getBrands();
    setBrand(brands.data.data.brands);
  };

  const getAllCategories = async () => {
    const categories = await getCategories();
    setCategory(categories.data.data.categories);
  };

  useEffect(() => {
    getAllBrands();
    getAllCategories();
  }, []);

  const handleImages = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUploadImages = async (e) => {
    clearErrors();

    if (!selectedFiles || !selectedFiles.length) {
      setError("required", { message: "Please Select at least one file" });
      return;
    }
    if (selectedFiles.length > 5) {
      setError("maxLen", { message: "You can upload maximum 5 files" });
      return;
    }

    setIsUploading(true);

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const response = await fileUpload(formData);
      if (response.status === 200) {
        setImageUrls(response.data.data);
        setIsUploaded(true);
        alert("Images uploaded Successfully");
        setisDisabled(false);
      }

      setIsUploading(false);
      // console.log(response)
    } catch (error) {
      if (error.response.status === 500) {
        alert("Sorry,We are unable to upload image right now!");
      }
      console.error("Error uploading images:", error);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [inputFields, setInputFields] = useState([{ id: 0 }]);

  const addInputFields = () => {
    const newFields = [];
    for (let i = inputFields.length; i <= inputFields.length; i++) {
      newFields.push({ id: i });
    }
    setInputFields([...inputFields, ...newFields]);
  };

  const productName = watch("productName");
  const shortDescription = watch("shortDesc");
  const longDescription = watch("longDescription");

  const onSubmit = async (data) => {
    const hexColor = convertHexToFlutterFormat(data.color);
    const productData = {
      productName: data.productName,
      shortDescription: data.shortDesc,
      category: data.category,
      brand: data.brand,
      sizeType: data.sizeType,
      closureType: data.closureType,
      material: data.material,
      longDescription: data.longDescription,
      gender: data.gender,
      variants: [
        {
          color: hexColor,
          image_urls: imageUrls,
          sizes: inputFields.map((field, index) => ({
            size: data.variants[index].size,
            actual_price: data.variants[index].actual_price,
            discounted_price: data.variants[index].discounted_price,
            stock: data.variants[index].stock,
          })),
        },
      ],
    };

    try {
      var response = await addProduct(productData);
      if (response.status === 200) {
        alert("Product Added Successfully");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Product Already Exists");
      } else if (error.response.status === 500) {
        alert("Internal Server Error");
      } else if (error.response.status === 404) {
        alert("Category or Brand not found");
      } else {
        alert("Something went wrong");
      }
    }
    // console.log(productData);
  };

  const hasDynamicFieldErrors = () => {
    return inputFields.some((_, index) => {
      const dynamicFieldError = errors.variants && errors.variants[index];
      return dynamicFieldError && Object.keys(dynamicFieldError).length > 0;
    });
  };

  // Function to handle dynamic field validation
  const handleDynamicFieldValidation = (value, index, fieldName) => {
    const isRequired = true; // Change to false if not required
    const isValid = /^[1-9]\d*$/.test(value); // Positive integer pattern

    if (isRequired && !value.trim()) {
      setError(`variants[${index}].${fieldName}`, {
        type: "required",
        message: "This field is required",
      });
    } else if (!isValid) {
      setError(`variants[${index}].${fieldName}`, {
        type: "pattern",
        message: "Please enter a positive number without decimal points",
      });
    } else {
      setError(`variants[${index}].${fieldName}`, null);
    }
  };
  return (
    <div>
      <Topbar />
      <div className="flex gap-4">
        <Navbar />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="left my-5 ">
              <h1 className="font-bold text-xl">Add New Product</h1>
              <div className="flex flex-col m-2 mx-10">
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <div className="shadow-lg p-5 rounded-md">
                    <div className="flex flex-col">
                      <label htmlFor="productName" className="font-light ">
                        Product Name{" "}
                        <span>
                          {" "}
                          ({productName ? productName.length : 0}/30)
                        </span>
                      </label>

                      <input
                        type="text"
                        id="productName"
                        className="border border-black rounded-md"
                        {...register("productName", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "Product name must be at least 3 characters long",
                          },
                          maxLength: {
                            value: 30,
                            message:
                              "Product name must be at most 30 characters long",
                          },
                        })}
                        maxLength={30}
                        minLength={3}
                      />
                      {errors.productName && (
                        <div className="text-red-600 text-sm">
                          {errors.productName.message}
                        </div>
                      )}

                      <label className="font-light" htmlFor="shortDesc">
                        Short Description{" "}
                        <span>
                          {" "}
                          ({shortDescription ? shortDescription.length : 0}/200)
                        </span>
                      </label>
                      <textarea
                        rows="4"
                        cols="40"
                        className="border p-2 border-black rounded-md"
                        id="shortDesc"
                        {...register("shortDesc", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                          minLength: {
                            value: 75,
                            message:
                              "Short description must be at least 75 characters long",
                          },
                          maxLength: {
                            value: 200,
                            message:
                              "Short description must be at most 200 characters long",
                          },
                        })}
                        maxLength={200}
                        minLength={75}
                      />
                      {errors.shortDesc && (
                        <div className="text-red-600 text-sm">
                          {errors.shortDesc.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="category flex flex-col m-2">
                    <h3 className="font-semibold">Category</h3>
                    <div className="shadow-lg p-5 rounded-md flex flex-col">
                      <label htmlFor="category" className="font-light ">
                        Category
                      </label>
                      <select
                        id="category"
                        className="border border-black rounded-md"
                        {...register("category", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                        })}
                      >
                        <option value="">Select Category</option>
                        {category.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.category}
                            </option>
                          );
                        })}
                      </select>
                      {errors.category && (
                        <div className="text-red-600 text-sm">
                          {errors.category.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="brand flex flex-col m-2">
                    <h3 className="font-semibold">Brand</h3>
                    <div className="shadow-lg p-5 rounded-md flex flex-col">
                      <label htmlFor="brand" className="font-light">
                        Brand
                      </label>
                      <select
                        id="brand"
                        className="border border-black rounded-md"
                        {...register("brand", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                        })}
                      >
                        <option value="">Select Brand</option>
                        {brand.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.brand}
                            </option>
                          );
                        })}
                      </select>
                      {errors.brand && (
                        <div className="text-red-600 text-sm">
                          {errors.brand.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sizeType flex flex-col m-2">
                    <h3 className="font-semibold">Size Type</h3>
                    <div className="shadow-lg p-5 rounded-md flex flex-col">
                      <label htmlFor="sizeType" className="font-light ">
                        Size Type
                      </label>
                      <select
                        id="sizeType"
                        className="border border-black rounded-md"
                        {...register("sizeType", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                        })}
                      >
                        <option value="">Select Size Type</option>
                        <option value="UK">UK</option>
                        <option value="US">US</option>
                        <option value="EU">EU</option>
                      </select>
                      {errors.sizeType && (
                        <div className="text-red-600 text-sm">
                          {errors.sizeType.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="closureType shadow-lg flex flex-col m-2">
                    <h3 className="font-semibold">Closure Type</h3>
                    <div className="shadow-lg p-5 rounded-md flex flex-col">
                      <label htmlFor="closureType" className="font-light ">
                        Closure Type
                      </label>
                      <select
                        id="closureType"
                        className="border border-black rounded-md"
                        {...register("closureType", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                        })}
                      >
                        <option value="">Select Closure Type</option>
                        <option value="zipper">Zipper</option>
                        <option value="button">Button</option>
                        <option value="hook and loop">Hook and Loop</option>
                        <option value="lace-up">Lace-up</option>
                        <option value="buckle">Buckle</option>
                        <option value="velcro">Velcro</option>
                      </select>
                      {errors.closureType && (
                        <div className="text-red-600 text-sm">
                          {errors.closureType.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="right my-5">
              <div className="flex flex-col m-2">
                <div className=" shadow-lg flex flex-col m-2">
                  <h3 className="font-semibold">Material & Long Description</h3>

                  <div className="material shadow-lg p-5 rounded-md flex flex-col">
                    <label htmlFor="material" className="font-light ">
                      Material
                    </label>
                    <select
                      id="material"
                      className="border border-black rounded-md"
                      {...register("material", {
                        required: {
                          value: true,
                          message: "This field is required ",
                        },
                      })}
                    >
                      <option value="">Select Material</option>
                      <option value="leather">Leather</option>
                      <option value="suede">Suede</option>
                      <option value="canvas">Canvas</option>
                      <option value="mesh">Mesh</option>
                      <option value="rubber">Rubber</option>
                      <option value="synthetic">Synthetic</option>
                      <option value="textile">Textile</option>
                      <option value="knit">Knit</option>
                      <option value="velvet">Velvet</option>
                      <option value="denim">Denim</option>
                      <option value="cork">Cork</option>
                      <option value="faux leather">Faux Leather</option>
                    </select>
                    {errors.material && (
                      <div className="text-red-600 text-sm">
                        {errors.material.message}
                      </div>
                    )}
                  </div>

                  <div className="longDescription shadow-lg p-5 rounded-md flex flex-col">
                    <label htmlFor="longDescription" className="font-light ">
                      Long Description
                      <span>
                        {" "}
                        ({longDescription ? longDescription.length : 0}/600)
                      </span>
                    </label>
                    <textarea
                      className="rounded-md border p-2 border-black"
                      id="longDescription"
                      rows="6"
                      cols="60"
                      {...register("longDescription", {
                        required: {
                          value: true,
                          message: "This field is required ",
                        },
                        minLength: {
                          value: 75,
                          message:
                            "Long description must be at least 75 characters long",
                        },
                        maxLength: {
                          value: 600,
                          message:
                            "Long description must be at most 600 characters long",
                        },
                      })}
                      maxLength={600}
                      minLength={75}
                    />

                    {errors.longDescription && (
                      <div className="text-red-600 text-sm">
                        {errors.longDescription.message}
                      </div>
                    )}
                  </div>

                  <div className="gender flex flex-col m-2">
                    <h3 className="font-semibold">Gender</h3>
                    <div className="shadow-lg p-5 rounded-md flex flex-col">
                      <label htmlFor="gender" className="font-light ">
                        Gender
                      </label>
                      <select
                        id="gender"
                        className="border border-black rounded-md"
                        {...register("gender", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                        })}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="female">Unisex</option>
                      </select>
                      {errors.gender && (
                        <div className="text-red-600 text-sm">
                          {errors.gender.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="color flex flex-col m-2">
                    <h3 className="font-semibold">Color</h3>
                    <div className="shadow-lg p-5 rounded-md flex flex-col">
                      <label htmlFor="color" className="font-light ">
                        Color
                      </label>
                      <input
                        type="color"
                        id="color"
                        className="border border-black rounded-md w-full"
                        {...register("color", {
                          required: {
                            value: true,
                            message: "This field is required ",
                          },
                        })}
                      />

                      {errors.color && (
                        <div className="text-red-600 text-sm">
                          {errors.color.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="images flex flex-col m-2">
                    <h3 className="font-semibold">Product Images</h3>

                    <div className="shadow-lg p-3 rounded-md flex flex-col">
                      <label htmlFor="images" className="font-light ">
                        Images - You can enter only 5 images
                      </label>
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        className="border border-black rounded-md w-full"
                        {...register("images")}
                        onChange={(e) => handleImages(e)}
                      />
                      {errors.required && (
                        <div className="text-red-600 text-sm">
                          {errors.required.message}
                        </div>
                      )}
                      {errors.maxLen && (
                        <div className="text-red-600 text-sm">
                          {errors.maxLen.message}
                        </div>
                      )}

                      <button
                        disabled={isUploaded || isUploading}
                        type="button"
                        className="disabled:opacity-50 bg-blue-500 my-2 p-1 px-2 rounded-md text-white"
                        onClick={(e) => handleUploadImages(e)}
                      >
                        Upload Images
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="variants ">
            <p className="font-bold text-xl my-2">
              Add Variant
              <span className="my-2 font-extralight text-sm">
                - Add Size, Actual Price, Discounted Price, Stock
              </span>
            </p>
          </div>

          <div className="flex flex-wrap">
            {inputFields.map((field, index) => (
              <div key={field.id} className="flex flex-row mx-2">
                <input
                  {...register(`variants[${index}].size`, {
                    required: {
                      value: true,
                      message: "these fields are required",
                    },
                    pattern: {
                      value: /^[1-9]\d*$/,
                      message: "Validation violated ",
                    },
                    validate: {
                      min: (value) =>
                        parseInt(value) >= 1 || "Value must be at least 1",
                      max: (value) =>
                        parseInt(value) <= 48 || "Value must be at most 48",
                    },
                  })} // Adding required validation rule
                  onSubmit={(e) =>
                    handleDynamicFieldValidation(e.target.value, index, `size`)
                  }
                  type="text"
                  className="border m-2 border-black w-[18vw] p-2 rounded-lg"
                  placeholder="Size"
                />

                <input
                  {...register(`variants[${index}].actual_price`, {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[1-9]*\.?[0-9]+$/,
                      message: "Please enter a positive number",
                    },
                  })} // Adding required validation rule
                  onSubmit={(e) =>
                    handleDynamicFieldValidation(
                      e.target.value,
                      index,
                      `actual_price`
                    )
                  }
                  type="text"
                  className="border m-2 border-black w-[18vw] p-2 rounded-lg"
                  placeholder="Actual Price"
                />
                <input
                  {...register(`variants[${index}].discounted_price`, {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[1-9]*\.?[0-9]+$/,
                      message: "Please enter a positive number",
                    },
                  })} // Adding required validation rule
                  onSubmit={(e) =>
                    handleDynamicFieldValidation(
                      e.target.value,
                      index,
                      `discounted_price`
                    )
                  }
                  type="text"
                  className="border m-2 border-black w-[18vw] p-2 rounded-lg"
                  placeholder="Discounted Price"
                />
                <input
                  {...register(`variants[${index}].stock`, {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[0-9]\d*$/,
                      message:
                        "Please enter a positive number without decimal points",
                    },
                  })} // Adding required validation rule
                  onSubmit={(e) =>
                    handleDynamicFieldValidation(
                      e.target.value,
                      index,
                      `variants[${index}].stock`
                    )
                  }
                  type="text"
                  className="border m-2 border-black w-[18vw] p-2 rounded-lg"
                  placeholder="Stock"
                />

                {errors.variants &&
                  errors.variants[index] &&
                  errors.variants[index].size && (
                    <div className="text-red-600 text-sm mt-4">
                      {errors.variants[index].size.message}
                    </div>
                  )}
              </div>
            ))}
          </div>
          {hasDynamicFieldErrors() && (
            <div className="text-red-500 block mx-3">
              There are errors in the above dynamic fields. Please fix them.it
              can only contain positive numeric values
            </div>
          )}

          <button
            className="button float-right bg-blue-500 p-1 px-2 rounded-md text-white"
            type="button"
            onClick={addInputFields}
          >
            Add More Sizes
          </button>

          <input
            disabled={isDisabled || isSubmitting}
            type="submit"
            value="Add Product"
            className="cursor-pointer disabled:opacity-50 m-2 rounded-lg button bg-blue-500 p-2 text-white w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

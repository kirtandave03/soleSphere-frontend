import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import Topbar from "../layouts/TopBar";
import { useForm, useWatch } from "react-hook-form";
import { getBrands } from "../services/brand.service";
import { getCategories } from "../services/category.service";
import { fileUpload } from "../services/fileupload.service";
import { addProduct } from "../services/product.service";
import convertHexToFlutterFormat from "../utils/convertHexToFlutterFormat";
import Alert from "@mui/material/Alert";
import Lottie from "lottie-react-web";
import animationData from "../utils/loading.json";

const AddProducts = () => {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFail, setUploadFail] = useState(false);
  const [wentWrong, setWentWrong] = useState(false);
  const [productExists, setProductExists] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [serverError, setServerError] = useState(false);

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
    setLoading(true);

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const response = await fileUpload(formData);
      if (response.status === 200) {
        setImageUrls(response.data.data);
        setIsUploaded(true);
        setUploadSuccess(true);
        setLoading(false);
        setisDisabled(false);
      }

      setIsUploading(false);
      // console.log(response)
    } catch (error) {
      setLoading(false);
      if (error.response.status === 500) {
        setUploadFail(true);
      } else {
        setWentWrong(true);
      }
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
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
    setLoading(true);
    const hexColor = convertHexToFlutterFormat(data.color);
    console.log("Afetr Function : ", hexColor);
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
        setSubmitSuccess(true);
        setLoading(false);
        setisDisabled(true);
        setIsUploaded(false);
        reset();
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        setProductExists(true);
      } else if (error.response.status === 500) {
        setServerError(true);
      } else if (error.response.status === 404) {
        setNotFound(true);
      } else {
        setWentWrong(true);
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
    const isValid = /^[0-9]\d*\.?\d+$/.test(value); // Floating-point number pattern

    if (isRequired && !value.trim()) {
      setError(`variants[${index}].${fieldName}`, {
        type: "required",
        message: "This field is required",
      });
    } else if (!isValid) {
      setError(`variants[${index}].${fieldName}`, {
        type: "pattern",
        message: "Please enter a positive number",
      });
    } else {
      setError(`variants[${index}].${fieldName}`, null);
    }
  };

  useEffect(() => {
    let timer;
    if (submitSuccess) {
      timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }

    if (uploadSuccess) {
      timer = setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
    }

    if (uploadFail) {
      timer = setTimeout(() => {
        setUploadFail(false);
      }, 5000);
    }
    if (notFound) {
      timer = setTimeout(() => {
        setNotFound(false);
      }, 5000);
    }
    if (productExists) {
      timer = setTimeout(() => {
        setProductExists(false);
      }, 5000);
    }
    if (serverError) {
      timer = setTimeout(() => {
        setServerError(false);
      }, 5000);
    }
    if (wentWrong) {
      timer = setTimeout(() => {
        setWentWrong(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [
    submitSuccess,
    uploadSuccess,
    uploadFail,
    notFound,
    productExists,
    serverError,
    wentWrong,
  ]);
  return (
    <>
      {/* <Topbar /> */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Lottie
            options={{
              animationData: animationData,
              loop: true,
              autoplay: true,
            }}
            width={200}
            height={200}
          />
        </div>
      ) : (
        <div>
          {uploadSuccess && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="success"
              className="w-full"
              onClose={() => {
                setUploadSuccess(false);
              }}
            >
              Images Uploaded Successfully!
            </Alert>
          )}
          {submitSuccess && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="success"
              className="w-full"
              onClose={() => {
                setSubmitSuccess(false);
              }}
            >
              Product Added Successfully!
            </Alert>
          )}
          {uploadFail && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="error"
              className="w-full"
              onClose={() => {
                setUploadFail(false);
              }}
            >
              Sorry,We are unable to upload image right now!
            </Alert>
          )}
          {wentWrong && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="error"
              className="w-full"
              onClose={() => {
                setWentWrong(false);
              }}
            >
              Something Went Wrong!
            </Alert>
          )}
          {productExists && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="error"
              className="w-full"
              onClose={() => {
                setProductExists(false);
              }}
            >
              Product Already Exists!
            </Alert>
          )}
          {notFound && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="error"
              className="w-full"
              onClose={() => {
                setNotFound(false);
              }}
            >
              Brand Or Category Not Found!
            </Alert>
          )}
          {serverError && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="error"
              className="w-full"
              onClose={() => {
                setServerError(false);
              }}
            >
              Internal Server Error!
            </Alert>
          )}

          <div className="flex gap-4">
            <Navbar />
            <div className="w-[87vw] flex justify-center items-center">
              <div className="flex flex-col">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex mt-[6vh] shadow-lg">
                    <div className="left my-5 ">
                      <h1 className="font-bold text-xl">Add New Product</h1>
                      <div className="flex flex-col m-2 mx-10">
                        <div>
                          <h3 className="font-semibold">Description</h3>
                          <div className="  p-5 rounded-md">
                            <div className="flex flex-col">
                              <label
                                htmlFor="productName"
                                className="font-light "
                              >
                                Product Name
                                <span>
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
                                  pattern: {
                                    value: /^(?!.*\s{2,})\S(?:.*\S)?$/,
                                    message:
                                      "Only one space is allowed between words, and no leading or trailing spaces are permitted.",
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
                              <div className="font-light text-base mb-1">
                                (At least 3 characters)*
                              </div>
                              {errors.productName && (
                                <div className="text-red-600 text-sm">
                                  {errors.productName.message}
                                </div>
                              )}

                              <label className="font-light" htmlFor="shortDesc">
                                Short Description
                                <span>
                                  (
                                  {shortDescription
                                    ? shortDescription.length
                                    : 0}
                                  /200)
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
                                  pattern: {
                                    value: /^(?!.*\s{2,})\S(?:.*\S)?$/,
                                    message:
                                      "Only one space is allowed between words, and no leading or trailing spaces are permitted.",
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
                              <div className="font-light text-base">
                                (At least 75 characters)*
                              </div>
                              {errors.shortDesc && (
                                <div className="text-red-600 text-sm">
                                  {errors.shortDesc.message}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="category flex flex-col m-2">
                            <h3 className="font-semibold">Category</h3>
                            <div className="  p-5 rounded-md flex flex-col">
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
                            <div className="  p-5 rounded-md flex flex-col">
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
                            <div className="  p-5 rounded-md flex flex-col">
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

                          <div className="closureType   flex flex-col m-2">
                            <h3 className="font-semibold">Closure Type</h3>
                            <div className="  p-5 rounded-md flex flex-col">
                              <label
                                htmlFor="closureType"
                                className="font-light "
                              >
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
                                <option value="hook and loop">
                                  Hook and Loop
                                </option>
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
                        <div className="   flex flex-col m-2">
                          <h3 className="font-semibold">
                            Material & Long Description
                          </h3>

                          <div className="material   p-5 rounded-md flex flex-col">
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

                          <div className="longDescription   p-5 rounded-md flex flex-col">
                            <label
                              htmlFor="longDescription"
                              className="font-light "
                            >
                              Long Description
                              <span>
                                ({longDescription ? longDescription.length : 0}
                                /600)
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
                                pattern: {
                                  value: /^(?!.*\s{2,})\S(?:.*\S)?$/,
                                  message:
                                    "Only one space is allowed between words, and no leading or trailing spaces are permitted.",
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
                            <div className="font-light text-base">
                              (At least 75 characters)*
                            </div>
                            {errors.longDescription && (
                              <div className="text-red-600 text-sm">
                                {errors.longDescription.message}
                              </div>
                            )}
                          </div>

                          <div className="gender flex flex-col m-2">
                            <h3 className="font-semibold">Gender</h3>
                            <div className="  p-5 rounded-md flex flex-col">
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
                            <div className="  p-5 rounded-md flex flex-col">
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

                            <div className="  p-3 rounded-md flex flex-col">
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

                  <div className="w-full">
                    <div className="variants w-full">
                      <p className="font-bold text-xl my-2">
                        Add More Sizes
                        <span className="my-2 font-extralight text-sm">
                          - Add Size, Actual Price, Discounted Price, Stock
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-between my-3 w-[80vw]">
                      {inputFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex flex-row w-full justify-between"
                        >
                          <input
                            {...register(`variants[${index}].size`, {
                              required: {
                                value: true,
                                message: "This field is required",
                              },
                              pattern: {
                                value: /^[0-9]\d*$/,
                                message: "Validation violated ",
                              },
                              validate: {
                                min: (value) =>
                                  parseInt(value) >= 1 ||
                                  "Value must be at least 1",
                                max: (value) =>
                                  parseInt(value) <= 48 ||
                                  "Value must be at most 48",
                              },
                            })} // Adding required validation rule
                            type="text"
                            onSubmit={(e) =>
                              handleDynamicFieldValidation(
                                e.target.value,
                                index,
                                `size`
                              )
                            }
                            className="border border-black w-1/5 my-2 p-2 rounded-lg"
                            placeholder="Size"
                          />
                          <input
                            {...register(`variants[${index}].actual_price`, {
                              required: {
                                value: true,
                                message: "This field is required",
                              },
                              pattern: {
                                value: /^[0-9]\d*\.?\d+$/,
                                message: "Please enter a positive number",
                              },
                              validate: {
                                min: (value) =>
                                  parseInt(value) >= 1 ||
                                  "Value must be at least 1",
                              },
                            })} // Adding required validation rule
                            type="text"
                            onSubmit={(e) =>
                              handleDynamicFieldValidation(
                                e.target.value,
                                index,
                                `actual_price`
                              )
                            }
                            className="border  border-black w-1/5 my-2 p-2 rounded-lg"
                            placeholder="Actual Price"
                          />
                          <input
                            {...register(
                              `variants[${index}].discounted_price`,
                              {
                                required: {
                                  value: true,
                                  message: "This field is required",
                                },
                                pattern: {
                                  value: /^[0-9]\d*\.?\d+$/,
                                  message: "Please enter a positive number",
                                },
                                validate: {
                                  min: (value) =>
                                    parseInt(value) >= 1 ||
                                    "Value must be at least 1",
                                },
                              }
                            )} // Adding required validation rule
                            onSubmit={(e) =>
                              handleDynamicFieldValidation(
                                e.target.value,
                                index,
                                `discounted_price`
                              )
                            }
                            type="text"
                            className="border  border-black w-1/5 my-2 p-2 rounded-lg"
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
                            type="text"
                            onSubmit={(e) =>
                              handleDynamicFieldValidation(
                                e.target.value,
                                index,
                                `stock`
                              )
                            }
                            className="border  border-black w-1/5 my-2 p-2 rounded-lg"
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
                        There are errors in the above dynamic fields. Please fix
                        them.it can only contain positive numeric values
                      </div>
                    )}
                    <button
                      className="button float-end bg-blue-500 p-1 px-2 rounded-md text-white"
                      type="button"
                      onClick={addInputFields}
                    >
                      Add More Sizes
                    </button>

                    <input
                      disabled={isSubmitting}
                      type="submit"
                      value="Add Variant"
                      className="cursor-pointer disabled:opacity-50 my-2 rounded-lg button bg-blue-500 text-white w-full"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProducts;

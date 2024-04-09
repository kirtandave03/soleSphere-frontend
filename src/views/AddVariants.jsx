import React, { useEffect, useState } from "react";
import TopBar from "../layouts/TopBar";
import Lottie from "lottie-react-web";
import Navbar from "../layouts/Navbar";
import { useForm } from "react-hook-form";
import { fileUpload } from "../services/fileupload.service";
import { addVariant, getAllProducts } from "../services/product.service";
import convertHexToFlutterFormat from "../utils/convertHexToFlutterFormat";
import Alert from "@mui/material/Alert";
import { TbListSearch } from "react-icons/tb";
import animationData from "../utils/loading.json";
import capitalize from "../utils/capitalize";
const AddVariants = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [product_id, setProduct_id] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFail, setUploadFail] = useState(false);
  const [wentWrong, setWentWrong] = useState(false);
  const [variantExists, setVariantExists] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [serverError, setServerError] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
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

  const GetAllProducts = async () => {
    const response = await getAllProducts(query);
    // console.log(query);
    setFilteredProducts(response.data.data);
    // console.log(filteredProducts);
  };

  useEffect(() => {
    GetAllProducts();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedProduct(e.target.value);
    setProducts(filteredProducts);
  };

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

      setIsUploading(false);

      if (response.status === 200) {
        setImageUrls(response.data.data);
        setIsUploaded(true);
        setLoading(false);
        setUploadSuccess(true);
        setisDisabled(false);
      }

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

  const handleOptionClick = (productName, productId) => {
    setSelectedProduct(productName);
    setProduct_id(productId);
    setProducts([]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const hexColor = convertHexToFlutterFormat(data.color);
    const variant = {
      productName: selectedProduct,
      variants: {
        color: hexColor,
        image_urls: imageUrls,
        sizes: inputFields.map((field, index) => ({
          size: data.variants[index].size,
          actual_price: data.variants[index].actual_price,
          discounted_price: data.variants[index].discounted_price,
          stock: data.variants[index].stock,
        })),
      },
    };

    try {
      var response = await addVariant(variant);
      if (response.status === 200) {
        reset();
        setSubmitSuccess(true);
        setLoading(false);
        setIsUploaded(false);
        setUploadSuccess(false);
        setisDisabled(true);
        setSelectedProduct("");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 500) {
        setServerError(true);
      } else if (error.response.status === 404) {
        setNotFound(true);
      } else if (error.response.status === 400) {
        setVariantExists(true);
      } else {
        setWentWrong(true);
      }
    }
  };

  const hasDynamicFieldErrors = () => {
    return inputFields.some((_, index) => {
      const dynamicFieldError = errors.variants && errors.variants[index];
      return dynamicFieldError && Object.keys(dynamicFieldError).length > 0;
    });
  };

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
    if (variantExists) {
      timer = setTimeout(() => {
        setVariantExists(false);
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
    variantExists,
    serverError,
    wentWrong,
  ]);

  // const handleClick = (e) => {
  //   setSelectedProduct(e.target.value);
  //   setQuery(selectedProduct);
  //   setProducts(filteredProducts);
  // };
  return (
    <>
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
        <div aria-disabled={loading}>
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
              Variant Added Successfully!
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
          {variantExists && (
            <Alert
              style={{ position: "fixed", zIndex: 40 }}
              severity="error"
              className="w-full"
              onClose={() => {
                setVariantExists(false);
              }}
            >
              Variant Already Exists!
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
              Product Not Found!
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
          {/* <TopBar /> */}
          <div className="flex gap-4 ">
            <Navbar />
            <div className="w-[90vw] flex justify-center items-center">
              <div className="flex flex-col">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex mt-[6vh]">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold">Add Variant</h2>
                      <h2 className="font-semibold my-3 mx-6">
                        Product, Color, Images
                      </h2>
                    </div>
                    <div className="my-6 flex justify-center ">
                      <div className="flex flex-col my-6">
                        <div className="p-4 shadow-lg my-2">
                          <label
                            htmlFor="product_id"
                            className="font-extralight"
                          >
                            Product Name
                          </label>

                          <input
                            className="mx-2 border w-[30vw] border-black rounded-lg"
                            type="text"
                            id="product_id"
                            {...register("productName", {
                              required: {
                                value: true,
                                message: "Product Name is required ",
                              },
                            })}
                            value={selectedProduct}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          {/* <div className="flex justify-center items-center">
                              <button
                                type="button"
                                className="py-3"
                                onClick={handleClick}
                              >
                                <TbListSearch className="text-2xl " />
                              </button>
                            </div> */}

                          <div className="font-light text-base mt-1 mb-1">
                            (At least 3 characters)*
                          </div>
                          <ul>
                            {products.map((item, index) => (
                              <li
                                key={index}
                                className="my-2 border border-b-4 p-2 cursor-pointer"
                                onClick={() =>
                                  handleOptionClick(item.productName)
                                }
                              >
                                {capitalize(item.productName)}
                              </li>
                            ))}
                          </ul>
                          {errors.productName && (
                            <div className="text-red-600 text-sm">
                              {errors.productName.message}
                            </div>
                          )}
                        </div>

                        <div className="p-4 shadow-lg my-2 ">
                          <label htmlFor="color" className="font-extralight">
                            Choose Color
                          </label>
                          <input
                            className="w-[30vw] border border-black rounded-lg m-4"
                            type="color"
                            id="color"
                            {...register("color", {
                              required: {
                                value: false,
                                message: "This field is required",
                              },
                            })}
                          />
                          {errors.color && (
                            <div className="text-red-600 text-sm">
                              {errors.color.message}
                            </div>
                          )}
                        </div>

                        <div className="p-4 shadow-lg my-2 ">
                          <label htmlFor="images" className="font-extralight">
                            Upload Images
                          </label>
                          <input
                            className="w-[20vw] border border-black rounded-lg m-4"
                            type="file"
                            id="images"
                            multiple
                            accept="image/*"
                            {...register("images")}
                            onChange={(e) => handleImages(e)}
                          />
                          <button
                            disabled={isUploaded || isUploading}
                            type="button"
                            className="disabled:opacity-50 bg-blue-500 my-2 p-1 px-2 rounded-md text-white"
                            onClick={(e) => handleUploadImages(e)}
                          >
                            Upload Images
                          </button>
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
                            className="border  border-black w-1/5 p-2 my-2 rounded-lg"
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

export default AddVariants;

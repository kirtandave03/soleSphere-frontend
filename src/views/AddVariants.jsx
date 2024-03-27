import React, { useEffect, useState } from "react";
import TopBar from "../layouts/TopBar";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { fileUpload } from "../services/fileupload.service";
import { addVariant, getProducts } from "../services/product.service";

const AddVariants = () => {
  const [searchResult, setSearchResult] = useState([]);
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

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
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

  const getAllProducts = async () => {
    const response = await getProducts(0, 0, query);
    setFilteredProducts(response.data.data.products);
  };

  useEffect(() => {
    getAllProducts();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedProduct(e.target.value);
    setProducts(filteredProducts);
  };

  function convertHexToFlutterFormat(hexColor) {
    hexColor = hexColor.replace("#", "");

    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    const flutterColor = `0xFF${("0" + r.toString(16)).slice(-2)}${(
      "0" + g.toString(16)
    ).slice(-2)}${("0" + b.toString(16)).slice(-2)}`;

    return flutterColor;
  }

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

      setIsUploading(false);

      if (response.status === 200) {
        setImageUrls(response.data.data);
        setIsUploaded(true);
        alert("Images uploaded Successfully");
        setisDisabled(false);
      }

      // console.log(response)
    } catch (error) {
      if (error.response.status === 500) {
        alert("Sorry,We are unable to upload image right now!");
      }
      console.error("Error uploading images:", error);
    }
  };

  const handleOptionClick = (productName, productId) => {
    setSelectedProduct(productName);
    setProduct_id(productId);
    setProducts([]);
  };

  const onSubmit = async (data) => {
    const hexColor = convertHexToFlutterFormat(data.color);

    const variant = {
      product_id,
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
      var response = await addVariant();
      if (response.status === 200) {
        alert("New variant Added Successfully");
      }
    } catch (error) {
      if (error.response.status === 500) {
        alert("Internal Server Error");
      } else if (error.response.status === 400) {
        alert("Variant Already Exists");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <TopBar />
      <div className="flex gap-4 ">
        <Navbar />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex ">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">Add Variant</h2>
              <h2 className="font-semibold my-3 mx-6">
                Product, Color, Images
              </h2>
            </div>
            <div className="my-6 flex justify-center ">
              <div className="flex flex-col my-6">
                <div className="p-4 shadow-lg my-2">
                  <label htmlFor="product_id" className="font-extralight">
                    Product Name
                  </label>
                  <input
                    className="mx-2 border w-[30vw] border-black rounded-lg"
                    type="text"
                    id="product_id"
                    {...register("productName", {
                      required: {
                        value: true,
                        message: "This field is required ",
                      },
                    })}
                    value={selectedProduct}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <ul>
                    {products.map((item, index) => (
                      <li
                        key={index}
                        className="my-2 border border-b-4 p-2 cursor-pointer"
                        onClick={() =>
                          handleOptionClick(item.productName, item._id)
                        }
                      >
                        {item.productName}
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
                      {errors.required.message}{" "}
                    </div>
                  )}
                  {errors.maxLen && (
                    <div className="text-red-600 text-sm">
                      {errors.maxLen.message}{" "}
                    </div>
                  )}
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
                      message: "This field is required",
                    },
                  })} // Adding required validation rule
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
                  })} // Adding required validation rule
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
                  })} // Adding required validation rule
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
                  })} // Adding required validation rule
                  type="text"
                  className="border m-2 border-black w-[18vw] p-2 rounded-lg"
                  placeholder="Stock"
                />
                {errors[field.fieldName] && (
                  <div className="text-red-500 block mt-1">
                    {errors[field.fieldName].message}
                  </div>
                )}
              </div>
            ))}
          </div>
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
            value="Add Variant"
            className="cursor-pointer disabled:opacity-50 m-2 rounded-lg button bg-blue-500 p-2 text-white w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddVariants;

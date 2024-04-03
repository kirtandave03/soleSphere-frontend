import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import capitalize from "../utils/capitalize";
import convertHexToFlutterFormat from "../utils/convertHexToFlutterFormat";
import convertFlutterToHexFormat from "../utils/convertFlutterToHexFormat";
import { FaSpinner } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { getCategories } from "../services/category.service";
import { getBrands } from "../services/brand.service";
import { editProduct, getProductDetails } from "../services/product.service";
import Alert from "@mui/material/Alert";

function EditProductPage() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { productId } = useParams();
  const closureTypes = [
    "zipper",
    "button",
    "hook and loop",
    "lace-up",
    "buckle",
    "velcro",
  ];
  const materials = [
    "suede",
    "canvas",
    "mesh",
    "rubber",
    "synthetic",
    "textile",
    "knit",
    "velvet",
    "denim",
    "cork",
    "faux leather",
  ];
  const sizeTypes = ["US", "UK", "EU"];
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    shortDescription: "",
    longDescription: "",
    closureType: "",
    material: "",
    gender: "",
    sizeType: "",
    category: "",
    brand: "",
    variant: [],
  });

  const fetchData = async () => {
    try {
      const productResponse = await getProductDetails(productId);

      const categoryResponse = await getCategories();

      const brandResponse = await getBrands();

      const product = productResponse.data.data;
      const categories = categoryResponse.data.data.categories;
      const brands = brandResponse.data.data.brands;

      setProductData({
        productName: product.productName,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        closureType: product.closureType,
        material: product.material,
        gender: product.gender,
        sizeType: product.sizeType,
        category: product.category.category,
        brand: product.brand.brand,
        variant: product.variants,
      });

      setValue("productName", capitalize(product.productName));
      setValue("shortDescription", product.shortDescription);
      setValue("longDescription", product.longDescription);
      setValue("closureType", product.closureType);
      setValue("material", product.material);
      setValue("gender", product.gender);
      setValue("sizeType", product.sizeType);
      setValue("category", product.category.category);
      setValue("brand", product.brand.brand);
      setValue("variants", product.variants);

      setCategories(categories);
      setBrands(brands);
      setVariants(variants);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  useEffect(() => {
    register("selectedColor");
  }, [register]);

  const handleColorClick = (color) => {
    setValue("selectedColor", color);
    setSelectedColor(color);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const productName = watch("productName");
  const shortDescription = watch("shortDescription");
  const longDescription = watch("longDescription");

  const onSubmit = async (data) => {
    const updatedVariants = productData.variant.map((variant, index) => {
      console.log(variant.color);
      if (variant.color === selectedColor) {
        return {
          ...variant,
          color: convertHexToFlutterFormat(data[`variant${index}`]),
          sizes: variant.sizes.map((size, sizeIndex) => ({
            ...size,
            size: data[`size${sizeIndex}`],
            actual_price: data[`actualPrice${sizeIndex}`],
            discounted_price: data[`discountedPrice${sizeIndex}`],
            stock: data[`stock${sizeIndex}`],
          })),
        };
      }
      return variant;
    });

    const body = {
      productName: productData.productName,
      updatedProductName: data.productName,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      closureType: data.closureType,
      material: data.material,
      gender: data.gender,
      sizeType: data.sizeType,
      category: data.category,
      brand: data.brand,
      variant: updatedVariants,
    };

    try {
      const response = await editProduct(body);

      console.log(response.status);

      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate(-1);
        }, 5000);
      }
    } catch (error) {
      console.error("Error updating product:", error);

      if (error.response.status === 404) {
        alert("not found");
      }
    }

    console.log("Form Data:", body);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin h-12 w-12 mr-3" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      {showAlert && (
        <Alert
          style={{ position: "fixed" }}
          severity="success"
          className="w-full"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          Product updated successfully! :)
        </Alert>
      )}
      <div className="flex flex-col h-screen bg-main-bg bg-cover">
        <TopBar />
        <div className="flex flex-grow">
          <Navbar />
          <div className="p-4 pt-0 w-full">
            <h1 className="font-bold text-lg ml-4 mb-4">Edit Product</h1>
            <div className="pl-6 bg-white shadow pr-3 py-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
                    <label className="font-semibold block mb-2">
                      Product Name
                      <span className="font-light text-base">
                        {" "}
                        ({productName ? productName.length : 0}/30)
                      </span>
                    </label>
                    <input
                      className="bg-input-bg border border-gray-300 rounded-md p-2 w-full"
                      type="text"
                      {...register("productName", {
                        required: "Product name is required",
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
                        defaultValue: productData.productName,
                      })}
                      maxLength={30}
                      minLength={3}
                    />
                    <div className="font-light text-base">
                      (At least 3 characters)*
                    </div>
                    {errors.productName && (
                      <div className="text-red-600 text-sm mb-1">
                        {errors.productName.message}
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 pl-2">
                    <label className="font-semibold block mb-2">
                      Short Description
                      <span className="font-light text-base">
                        {" "}
                        ({shortDescription ? shortDescription.length : 0}/200)
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      className="bg-input-bg border border-gray-300 rounded-md p-2 w-full"
                      {...register("shortDescription", {
                        required: "Short description is required",
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
                        defaultValue: productData.shortDescription,
                      })}
                      maxLength={200}
                      minLength={75}
                    />
                    <div className="font-light text-base">
                      (At least 75 characters)*
                    </div>
                    {errors.shortDescription && (
                      <div className="text-red-600 text-sm mb-1">
                        {errors.shortDescription.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="font-semibold block mb-2">
                    Long Description
                    <span className="font-light text-base">
                      ({longDescription ? longDescription.length : 0}/600)
                    </span>
                  </label>
                  <textarea
                    rows={5}
                    className="bg-input-bg border border-gray-300 rounded-md p-2 w-full"
                    {...register("longDescription", {
                      required: "Long description is required",
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
                      defaultValue: productData.longDescription,
                    })}
                    maxLength={600}
                    minLength={75}
                  />
                  <div className="font-light text-base">
                    (At least 75 characters)*
                  </div>
                  {errors.longDescription && (
                    <div className="text-red-600 text-sm mb-1">
                      {errors.longDescription.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/3 pr-2 mb-4 md:mb-0">
                    <label className="font-semibold block mb-2">
                      Closure Type
                    </label>
                    <select
                      className="bg-input-bg border-input-bg placeholder:text-center"
                      {...register("closureType")}
                    >
                      {closureTypes.map((closureType) => (
                        <option
                          key={closureType}
                          value={closureType}
                          defaultValue={productData.closureType === closureType}
                        >
                          {closureType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/3 pr-2 mb-4 md:mb-0">
                    <label className="font-semibold block mb-2">Material</label>
                    <select
                      className="bg-input-bg border-input-bg placeholder:text-center"
                      {...register("material")}
                    >
                      {materials.map((material) => (
                        <option
                          key={material}
                          value={material}
                          defaultValue={productData.material === material}
                        >
                          {material}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/3 pr-2 mb-4 md:mb-0">
                    <label className="font-semibold block mb-2">Gender</label>
                    <input
                      className="bg-input-bg"
                      type="radio"
                      value="male"
                      {...register("gender", {
                        defaultChecked: productData.gender === "male",
                      })}
                    />
                    <label className="pr-2">Male</label>

                    <input
                      className="bg-input-bg"
                      type="radio"
                      value="female"
                      {...register("gender", {
                        defaultChecked: productData.gender === "female",
                      })}
                    />
                    <label className="pr-2">Female</label>

                    <input
                      className="bg-input-bg"
                      type="radio"
                      value="unisex"
                      {...register("gender", {
                        defaultChecked: productData.gender === "unisex",
                      })}
                    />
                    <label>Unisex</label>
                  </div>
                </div>
                <div className="flex flex-wrap mb-4 mt-4">
                  <div className="w-full md:w-1/3 pl-2">
                    <label className="font-semibold block mb-2">
                      Size Type:
                    </label>
                    <select
                      className="bg-input-bg border-input-bg placeholder:text-center"
                      {...register("sizeType")}
                    >
                      {sizeTypes.map((sizeType) => (
                        <option
                          key={sizeType}
                          value={sizeType}
                          defaultValue={productData.sizeType === sizeType}
                        >
                          {sizeType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/3 pr-2 mb-4 md:mb-0">
                    <label className="font-semibold block mb-2">
                      Category:
                    </label>
                    <select
                      className="bg-input-bg border-input-bg placeholder:text-center"
                      {...register("category")}
                    >
                      {categories.map((category) => (
                        <option
                          key={category._id}
                          value={category.category}
                          defaultValue={
                            productData.category === category.category
                          }
                        >
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/3 pr-2 mb-4 md:mb-0">
                    <label className="font-semibold block mb-2">Brand</label>
                    <select
                      className="bg-input-bg border-input-bg placeholder:text-center"
                      {...register("brand")}
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option
                          key={brand._id}
                          value={brand.brand}
                          defaultValue={productData.brand === brand.brand}
                        >
                          {brand.brand}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col flex-wrap mb-4 mt-4">
                  <div className="">
                    <h2 className="font-semibold text-center mb-2">Variants</h2>
                    <div className="flex gap-3 justify-center">
                      {productData.variant.map((variant, index) => (
                        <div
                          key={variant.color}
                          className="flex justify-center items-center gap-1"
                          onClick={() => handleColorClick(variant.color)}
                        >
                          <input
                            type="color"
                            defaultValue={convertFlutterToHexFormat(
                              variant.color
                            )}
                            className={`p-0 ${
                              selectedColor === variant.color
                                ? "border border-black"
                                : ""
                            }`}
                            {...register(`variant${index}`, {
                              required: {
                                value: true,
                                message: "This field is required ",
                              },
                            })}
                          />
                          {isDropdownOpen ? (
                            <IoIosArrowDropup
                              onClick={toggleDropdown}
                              className="mr-2 cursor-pointer"
                            />
                          ) : (
                            <IoIosArrowDropdown
                              onClick={toggleDropdown}
                              className="mr-2 cursor-pointer"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {isDropdownOpen && selectedColor && (
                    <div>
                      {productData.variant.map((variant) => {
                        if (variant.color === selectedColor) {
                          return (
                            <div
                              key={variant._id}
                              className="flex justify-around flex-wrap my-2"
                            >
                              {variant.sizes.map((size, index) => (
                                <div
                                  key={size._id}
                                  className="w-56 p-2 bg-white shadow rounded-md"
                                >
                                  <div className="flex items-center">
                                    <p className="pr-2">Size: </p>
                                    <input
                                      type="text"
                                      className="bg-input-bg w-7 rounded-md"
                                      defaultValue={size.size}
                                      {...register(`size${index}`, {
                                        required: {
                                          value: true,
                                          message: "This field is required",
                                        },
                                        pattern: {
                                          value: /^[1-9]\d*$/,
                                          message:
                                            "Please enter a positive number without decimal pointsb",
                                        },
                                      })}
                                    />
                                  </div>
                                  {errors[`size${index}`] && (
                                    <div className="text-red-600 text-sm mb-1">
                                      {errors[`size${index}`].message}
                                    </div>
                                  )}
                                  <div className="flex items-center mb-1">
                                    <p className="pr-2">Actual Price: </p>
                                    <input
                                      type="text"
                                      className="bg-input-bg w-16 rounded-md"
                                      defaultValue={size.actual_price}
                                      {...register(`actualPrice${index}`, {
                                        required: {
                                          value: true,
                                          message: "This field is required",
                                        },
                                        pattern: {
                                          value: /^[0-9]*\.?[0-9]+$/,
                                          message:
                                            "Please enter a positive number",
                                        },
                                      })}
                                    />
                                  </div>
                                  {errors[`actualPrice${index}`] && (
                                    <div className="text-red-600 text-sm mb-1">
                                      {errors[`actualPrice${index}`].message}
                                    </div>
                                  )}
                                  <div className="flex items-center">
                                    <p className="pr-2">Discounted Price:</p>
                                    <input
                                      type="text"
                                      className="bg-input-bg w-16 rounded-md"
                                      defaultValue={size.discounted_price}
                                      {...register(`discountedPrice${index}`, {
                                        required: {
                                          value: true,
                                          message: "This field is required",
                                        },
                                        pattern: {
                                          value: /^[0-9]*\.?[0-9]+$/,
                                          message:
                                            "Please enter a positive number",
                                        },
                                      })}
                                    />
                                  </div>
                                  {errors[`discountedPrice${index}`] && (
                                    <div className="text-red-600 text-sm mb-1">
                                      {
                                        errors[`discountedPrice${index}`]
                                          .message
                                      }
                                    </div>
                                  )}
                                  <div className="flex items-center">
                                    <p className="pr-2">Stock: </p>
                                    <input
                                      type="text"
                                      className="bg-input-bg w-16 rounded-md"
                                      defaultValue={size.stock}
                                      {...register(`stock${index}`, {
                                        required: {
                                          value: true,
                                          message: "This field is required",
                                        },
                                        pattern: {
                                          value: /^[0-9]\d*$/,
                                          message:
                                            "Please enter a positive number without decimal points",
                                        },
                                      })}
                                    />
                                  </div>
                                  {errors[`stock${index}`] && (
                                    <div className="text-red-600 text-sm mb-1">
                                      {errors[`stock${index}`].message}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="mt-4 w-1/2 p-1 bg-[#4880FF] bg-cover text-white py-1 px-3 rounded-md hover:bg-[#417aff] hover:shadow-md mx-auto block disabled:opacity-50"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductPage;

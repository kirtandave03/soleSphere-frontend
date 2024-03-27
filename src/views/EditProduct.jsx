import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";

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
  const accessToken = localStorage.getItem("auth-token");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `https://solesphere-backend.onrender.com/api/v1/products/product-detail?product_id=${productId}`
        );
        const categoryResponse = await axios.get(
          "https://solesphere-backend.onrender.com/api/v1/categories"
        );
        const brandResponse = await axios.get(
          "https://solesphere-backend.onrender.com/api/v1/brands/"
        );

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

        setValue("productName", product.productName);
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

    fetchData();
  }, [productId]);

  useEffect(() => {
    register("selectedColor");
  }, [register]);

  const handleColorClick = (color) => {
    setValue("selectedColor", color);
    setSelectedColor(color);
  };

  const onSubmit = async (data) => {
    const updatedVariants = productData.variant.map((variant, index) => {
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

    const headers = {
      "Content-Type": "application/json",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products/edit-product",
        body,
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Product updated successfully.");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating product:", error);

      if (error.response.status === 404) {
        alert(error.response.data.message);
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

  function convertFlutterToHexFormat(flutterColor) {
    flutterColor = flutterColor.replace("0xFF", "");

    const r = parseInt(flutterColor.substr(0, 2), 16);
    const g = parseInt(flutterColor.substr(2, 2), 16);
    const b = parseInt(flutterColor.substr(4, 2), 16);

    const hexColor = `#${("0" + r.toString(16)).slice(-2)}${(
      "0" + g.toString(16)
    ).slice(-2)}${("0" + b.toString(16)).slice(-2)}`;

    return hexColor;
  }

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

  return (
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
                  </label>
                  <input
                    className="bg-input-bg border border-gray-300 rounded-md p-2 w-full"
                    type="text"
                    {...register("productName", {
                      defaultValue: productData.productName,
                    })}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2">
                  <label className="font-semibold block mb-2">
                    Short Description
                  </label>
                  <textarea
                    rows={5}
                    className="bg-input-bg border border-gray-300 rounded-md p-2 w-full"
                    {...register("shortDescription", {
                      defaultValue: productData.shortDescription,
                    })}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="font-semibold block mb-2">
                  Long Description
                </label>
                <textarea
                  rows={5}
                  className="bg-input-bg border border-gray-300 rounded-md p-2 w-full"
                  {...register("longDescription", {
                    defaultValue: productData.longDescription,
                  })}
                />
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
                  <label className="font-semibold block mb-2">Size Type:</label>
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
                  <label className="font-semibold block mb-2">Category:</label>
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
                        <IoIosArrowDropdown className="mr-2 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
                {selectedColor && (
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
                                        message: "This field is required ",
                                      },
                                    })}
                                  />
                                </div>
                                <div className="flex items-center mb-1">
                                  <p className="pr-2">Actual Price: </p>
                                  <input
                                    type="text"
                                    className="bg-input-bg w-16 rounded-md"
                                    defaultValue={size.actual_price}
                                    {...register(`actualPrice${index}`, {
                                      required: {
                                        value: true,
                                        message: "This field is required ",
                                      },
                                    })}
                                  />
                                </div>
                                <div className="flex items-center">
                                  <p className="pr-2">Discounted Price:</p>
                                  <input
                                    type="text"
                                    className="bg-input-bg w-16 rounded-md"
                                    defaultValue={size.discounted_price}
                                    {...register(`discountedPrice${index}`, {
                                      required: {
                                        value: true,
                                        message: "This field is required ",
                                      },
                                    })}
                                  />
                                </div>
                                <div className="flex items-center">
                                  <p className="pr-2">Stock: </p>
                                  <input
                                    type="text"
                                    className="bg-input-bg w-16 rounded-md"
                                    defaultValue={size.stock}
                                    {...register(`stock${index}`, {
                                      required: {
                                        value: true,
                                        message: "This field is required ",
                                      },
                                    })}
                                  />
                                </div>
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
                type="submit"
                className="mt-4 w-1/2 p-1 bg-[#4880FF] bg-cover text-white py-1 px-3 rounded-md hover:bg-[#417aff] hover:shadow-md mx-auto block"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductPage;

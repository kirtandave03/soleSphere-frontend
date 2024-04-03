import Navbar from "../layouts/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../layouts/TopBar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbRestore } from "react-icons/tb";
import capitalize from "../utils/capitalize";
import {
  deleteProduct,
  getDeletedProducts,
  getProducts,
  restoreProduct,
} from "../services/product.service";
import Alert from "@mui/material/Alert";

function Products() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageForDeleted, setPageForDeleted] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsPerPageForDeleted, setRowsPerPageForDeleted] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDeletedQuery, setSearchDeletedQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState();
  const [totalDeletedProducts, setTotalDeletedProducts] = useState();
  const [productNotFound, setProductNotFound] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(page, rowsPerPage, searchQuery);
      const responseData = response.data;

      console.log(response.data.data.responseData);

      setRows(responseData.data.responseData);
      setTotalProducts(responseData.data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchDeletedProducts = async () => {
    try {
      const response = await getDeletedProducts(
        pageForDeleted,
        rowsPerPageForDeleted,
        searchDeletedQuery
      );
      const responseData = response.data;

      console.log(responseData.data.deletedProducts);
      setDeletedRows(responseData.data.deletedProducts);
      setTotalDeletedProducts(responseData.data.totalCount);
    } catch (error) {
      console.error("Error fetching deleted products:", error);
    }
  };

  const onDelete = async (productName, product) => {
    try {
      const response = await deleteProduct(productName);

      // console.log(product);

      if (response.status === 200) {
        setRows(rows.filter((row) => row.productName !== productName));

        const toAddProduct = {
          productName: product.productName,
          variants: [
            {
              image_urls: [product.image],
              sizes: [{ discounted_price: product.discounted_price }],
            },
          ],
          category: { category: product.category },
          brand: { brand: product.brand },
          averageRating: product.avgRating,
        };

        // console.log(toAddProduct);

        setDeletedRows([...deletedRows, toAddProduct]);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response.status === 404) {
        setProductNotFound(true);
      }
    }
  };

  const onRestore = async (productId, product) => {
    try {
      const response = await restoreProduct(productId);

      // console.log(response.status);

      if (response.status === 200) {
        setDeletedRows(
          deletedRows.filter((product) => product._id !== productId)
        );

        const toAddProduct = {
          productName: product.productName,
          image: product.variants[0].image_urls[0],
          category: product.category.category,
          brand: product.brand.brand,
          discounted_price: product.variants[0].sizes[0].discounted_price,
          colors: product.variants.length,
          avgRating: product.averageRating,
        };
        setRows([...rows, toAddProduct]);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response.status === 404) {
        setProductNotFound(true);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchDeletedProducts();
  }, [
    searchQuery,
    searchDeletedQuery,
    page,
    pageForDeleted,
    rowsPerPage,
    rowsPerPageForDeleted,
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageForDeleted = (event, newPage) => {
    setPageForDeleted(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(page);
  };

  const handleChangeRowsPerPageForDeleted = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPageForDeleted(newRowsPerPage);
    setPageForDeleted(pageForDeleted);
  };

  const onEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setPage(0);
  };

  const handleDeletedSearch = (event) => {
    const query = event.target.value;
    setSearchDeletedQuery(query);
    setPage(0);
  };

  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="w-[90vw] flex-col">
          <div className="p-4 w-full">
            <h1 className="font-bold text-lg my-2 ml-4">Products</h1>
            <div className="relative">
              <div className="w-full absolute flex justify-center items-center">
                {productNotFound && (
                  <Alert
                    severity="error"
                    className="w-full"
                    onClose={() => {
                      setProductNotFound(false);
                    }}
                  >
                    Product not found!
                  </Alert>
                )}
              </div>
            </div>
            <div className="rounded-t-none rounded-b-sm p-2 flex items-center">
              <TextField
                id="search"
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="search"
                        onClick={handleSearch}
                      ></IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mx-2 mb-4 overflow-y-hidden border border-gray-300 overflow-x-auto rounded">
              <div className="w-full">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Image
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Product Name
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Category
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Brand
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Size
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Total Available Colors
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Average Rating
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows &&
                        rows.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell>
                              <img
                                src={row.image}
                                alt="Product Image"
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                }}
                              />
                            </TableCell>
                            <TableCell>{capitalize(row.productName)}</TableCell>
                            <TableCell>{capitalize(row.category)}</TableCell>
                            <TableCell>{capitalize(row.brand)}</TableCell>
                            <TableCell>{row.size}</TableCell>
                            <TableCell>{row.discounted_price}</TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {row.colors}
                            </TableCell>

                            <TableCell style={{ textAlign: "center" }}>
                              {row.avgRating !== null
                                ? row.avgRating.toFixed(2)
                                : "No Reviews"}
                            </TableCell>

                            <TableCell
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => onEdit(row._id)}
                                >
                                  <FaRegEdit />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => onDelete(row.productName, row)}
                                >
                                  <RiDeleteBinLine />
                                </IconButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalProducts}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) =>
                    handleChangePage(event, newPage)
                  }
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
          <div className="p-4 w-full">
            <h1 className="font-bold text-lg my-2 ml-4">Deleted Products</h1>

            <div className="rounded-t-none rounded-b-sm p-2 flex items-center">
              <TextField
                id="search"
                label="Search"
                variant="outlined"
                value={searchDeletedQuery}
                onChange={handleDeletedSearch}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="search"
                        onClick={handleDeletedSearch}
                      ></IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mx-2 mb-4 overflow-y-hidden border border-gray-300 overflow-x-auto rounded">
              <div className="w-full">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Image
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Product Name
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Category
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Brand
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Size
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Total Available Colors
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Average Rating
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deletedRows.map((deletedRow) => (
                        <TableRow key={deletedRow._id}>
                          <TableCell>
                            <img
                              src={deletedRow.variants[0].image_urls[0]}
                              alt="Product Image"
                              style={{
                                maxWidth: "100px",
                                maxHeight: "100px",
                              }}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(deletedRow.productName)}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(deletedRow.category.category)}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(deletedRow.brand.brand)}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {deletedRow.variants[0].sizes[0].size}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {deletedRow.variants[0].sizes[0].discounted_price}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {deletedRow.variants.length}
                          </TableCell>

                          <TableCell style={{ textAlign: "center" }}>
                            {deletedRow.averageRating !== null
                              ? deletedRow.averageRating.toFixed(2)
                              : "No Reviews"}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                onRestore(deletedRow._id, deletedRow)
                              }
                            >
                              <TbRestore />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalDeletedProducts || deletedRows.length}
                  rowsPerPage={rowsPerPageForDeleted}
                  page={pageForDeleted}
                  onPageChange={(event, newPage) =>
                    handleChangePageForDeleted(event, newPage)
                  }
                  onRowsPerPageChange={handleChangeRowsPerPageForDeleted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

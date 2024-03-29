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
  const accessToken = localStorage.getItem("auth-token");
  const [totalProducts, setTotalProducts] = useState();
  const [totalDeletedProducts, setTotalDeletedProducts] = useState();

  const fetchProducts = async () => {
    try {
      const response = await getProducts(page, rowsPerPage, searchQuery);
      const responseData = response.data;

      console.log(responseData.data.products);
      setRows(responseData.data.products);
      setTotalProducts(responseData.data.totalCount);
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

      console.log(response.status);

      if (response.status === 200) {
        setRows(rows.filter((row) => row.productName !== productName));
        setDeletedRows([...deletedRows, product]);
        alert("Product Deleted Successfully");
      } else if (response.status === 404) {
        alert("Product Not Found");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const onRestore = async (productId, product) => {
    try {
      const response = await restoreProduct(productId);

      console.log(response.status);

      if (response.status === 200) {
        setDeletedRows(
          deletedRows.filter((product) => product._id !== productId)
        );
        setRows([...rows, product]);
        alert("Product Restored Successfully");
      } else if (response.status === 404) {
        alert("Product Not Found");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
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
    setPage(page + 1);
  };

  const handleChangeRowsPerPageForDeleted = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPageForDeleted(newRowsPerPage);
    setPageForDeleted(pageForDeleted + 1);
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
            <div className="mb-4 overflow-y-hidden border border-gray-300 overflow-x-auto">
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
                      {rows.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell>
                            <img
                              src={row.variants[0].image_urls[0]}
                              alt="Product Image"
                              style={{
                                maxWidth: "100px",
                                maxHeight: "100px",
                              }}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(row.productName)}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(row.category.category)}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(row.brand.brand)}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {row.variants[0].sizes[0].discounted_price}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {row.variants.length}
                          </TableCell>

                          <TableCell style={{ textAlign: "center" }}>
                            {row.averageRating !== null
                              ? row.averageRating.toFixed(2)
                              : "No Reviews"}
                          </TableCell>

                          <TableCell style={{ textAlign: "center" }}>
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={totalProducts || rows.length}
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
            <div className="mb-4 overflow-y-hidden border border-gray-300 overflow-x-auto">
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

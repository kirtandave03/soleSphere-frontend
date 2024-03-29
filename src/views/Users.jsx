import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbRestore } from "react-icons/tb";

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

import {
  deleteUser,
  getDeletedUsers,
  getUsers,
  restoreUser,
} from "../services/user.service";
import capitalize from "../utils/capitalize";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageForDeleted, setPageForDeleted] = useState(0);
  const [rowsPerPageForDeleted, setRowsPerPageForDeleted] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [totalDeletedCount, setTotalDeletedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDeleted, setSearchQueryDeleted] = useState("");

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleChangeRowsPerPageForDeleted = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPageForDeleted(newRowsPerPage);
    setPageForDeleted(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageForDeleted = (event, newPage) => {
    setPageForDeleted(newPage);
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers(searchQuery, rowsPerPage, page);
      setUsers(response.data.data.users);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      alert("Error While fetching Users");
    }
  };

  const fetchDeletedUsers = async () => {
    try {
      const response = await getDeletedUsers(
        searchQueryDeleted,
        rowsPerPageForDeleted,
        pageForDeleted
      );
      setTotalDeletedCount(response.data.data.totalDeletedCount);
      setDeletedUsers(response.data.data.deletedUsers);
    } catch (error) {
      alert("Error while fetching Deleted Users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, page, rowsPerPage]);

  useEffect(() => {
    fetchDeletedUsers();
  }, [searchQueryDeleted, pageForDeleted, rowsPerPageForDeleted]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeletedSearch = (e) => {
    setSearchQueryDeleted(e.target.value);
  };

  const handleDelete = async (id, user) => {
    try {
      const response = await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      setDeletedUsers([...deletedUsers, user]);
      setTotalDeletedCount(deletedUsers.length);
      setTotalCount(users.length);
    } catch (error) {
      if (error.response.status === 404) {
        alert("User Not Found");
      } else if (error.response.status === 500) {
        alert("Internal Server Error");
      } else {
        alert("Something Went Wrong");
      }
    }
  };

  const handleRestoreUser = async (_id, user) => {
    try {
      const response = await restoreUser(_id);
      setDeletedUsers(deletedUsers.filter((user) => user._id !== _id));
      setUsers([...users, user]);
      setTotalDeletedCount(deletedUsers.length);
      setTotalCount(users.length);
    } catch (error) {
      if (error.response.status === 404) {
        alert("User Not Found");
      } else if (error.response.status === 500) {
        alert("Internal Server Error");
      } else {
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <div>
      <TopBar />
      <div className="flex">
        <Navbar />
        <div className="w-full">
          <h1 className="p-1 font-bold text-2xl">Users</h1>
          <div>
            <div className="rounded-t-none rounded-b-sm p-2 flex items-center">
              <TextField
                id="search"
                label="Search by email, phone or username"
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
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: "600", textAlign: "center" }}
                    >
                      No
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "600", textAlign: "center" }}
                    >
                      Profile
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "600", textAlign: "center" }}
                    >
                      User
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "600", textAlign: "center" }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "600", textAlign: "center" }}
                    >
                      Phone
                    </TableCell>

                    <TableCell
                      style={{ fontWeight: "600", textAlign: "center" }}
                    >
                      Location
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "600", textAlign: "center" }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    // no slice will be here. you will show the data comiNg from backend
                    users.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell style={{ textAlign: "center" }}>
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            className="rounded-full border border-black "
                            src={user.profilePic}
                            alt="user Image"
                            style={{
                              maxWidth: "50px",
                            }}
                          />
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {capitalize(user.username)}
                        </TableCell>

                        <TableCell style={{ textAlign: "center" }}>
                          {user.email}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {user.phone ? user.phone : "NA"}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {`${
                            user.address[0] ? user.address[0].town + "," : "NA"
                          } ${user.address[0] ? user.address[0].state : ""}`}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(user._id, user)}
                          >
                            <RiDeleteBinLine />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) =>
                handleChangePage(event, newPage)
              }
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

          <div>
            <h1 className="font-bold  text-2xl">Deleted Users</h1>
            <div className="rounded-t-none rounded-b-sm p-2 flex items-center">
              <TextField
                id="search"
                label="Search by email, phone or username"
                variant="outlined"
                value={searchQueryDeleted}
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
            {deletedUsers.length > 0 ? (
              <div>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          No
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Profile
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          User
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Phone
                        </TableCell>

                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Location
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        // no slice will be here. you will show the data comiNg from backend
                        deletedUsers.map((user, index) => (
                          <TableRow key={user._id}>
                            <TableCell style={{ textAlign: "center" }}>
                              {index + 1 + page * rowsPerPage}
                            </TableCell>
                            <TableCell
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                className="rounded-full border border-black "
                                src={user.profilePic}
                                alt="user Image"
                                style={{
                                  maxWidth: "50px",
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {capitalize(user.username)}
                            </TableCell>

                            <TableCell style={{ textAlign: "center" }}>
                              {user.email}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {user.phone ? user.phone : "NA"}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {`${
                                user.address[0]
                                  ? user.address[0].town + ","
                                  : "NA"
                              } ${
                                user.address[0] ? user.address[0].state : ""
                              }`}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <IconButton
                                aria-label="delete"
                                onClick={() =>
                                  handleRestoreUser(user._id, user)
                                }
                              >
                                <TbRestore />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalDeletedCount}
                  rowsPerPage={rowsPerPageForDeleted}
                  page={pageForDeleted}
                  onPageChange={(event, newPage) =>
                    handleChangePageForDeleted(event, newPage)
                  }
                  onRowsPerPageChange={handleChangeRowsPerPageForDeleted}
                />
              </div>
            ) : (
              <h2 className="font-bold m-6">Nothing to Show</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

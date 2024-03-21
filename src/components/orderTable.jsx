import React from "react";
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

const orderTable = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Image
              </TableCell>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Product Name
              </TableCell>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Category
              </TableCell>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Brand
              </TableCell>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Price
              </TableCell>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Total Available Colors
              </TableCell>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Average Rating
              </TableCell>
              <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToDisplay
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
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
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.category.category}</TableCell>
                  <TableCell>{row.brand.brand}</TableCell>
                  <TableCell>{row.discounted_price}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {row.colors}
                  </TableCell>
                  <TableCell>
                    <TableCell
                      style={{
                        borderBottom: "0px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {row.avgRating !== null ? row.avgRating.toFixed(2) : ""}
                    </TableCell>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => onEdit(row._id)}
                    >
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(row.productName)}
                    >
                      <DeleteOutlineOutlinedIcon />
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
        count={dataToDisplay.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default orderTable;

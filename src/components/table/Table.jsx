import { useState, useCallback, useEffect } from "react";
import "./styles.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDropzone } from "react-dropzone";
import { getUserFragmentsExpanded } from "../../util/api";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TableComponent(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = props;

  useEffect(() => {
    getUserFragmentsExpanded(user).then((res) => {
      if (typeof res != "undefined") {
        setData(res.fragments);
      }
      console.log(data)
    });
  }, []);

  const handleViewClick = (event) => {
    navigate("/fragments/:id");
  };

  const handleAddClick = (event) => {
    // navigate("/fragments/:id");
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Specify the accepted file types
  });

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // You can make an API request to send the formData to the server here
      // For example, using the fetch() function or a library like Axios
      // Replace 'your-upload-api-url' with the actual API endpoint
      fetch("your-upload-api-url", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server if needed
        })
        .catch((error) => {
          // Handle errors
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">Type</TableCell>

            <TableCell align="right">
              <Button variant="contained" onClick={handleAddClick}>
                Add New
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>

                <TableCell align="right">
                  <Button variant="contained" onClick={handleViewClick}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 532,
            height: 430,
            bgcolor: "background.paper",
            boxShadow: 24,
            // padding: "44px 51px",
          }}
          className="form-container"
        >
          <Typography
            sx={{ mt: 2, mb: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add Fragment
          </Typography>
          <Container>
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                padding: "100px",
                textAlign: "center",
              }}
            >
              <input {...getInputProps()} />
              <p>Drag and drop a file here, or click to select a file</p>
            </div>
            {selectedFile && <Typography>{selectedFile.name}</Typography>}
          </Container>
          <div>
            <Button size="small" variant="contained" onClick={handleUpload}>
              Create
            </Button>
            <Button variant="contained" size="small" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </TableContainer>
  );
}

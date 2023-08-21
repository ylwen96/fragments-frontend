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
import { getUserFragmentsExpanded, postUserFragments } from "../../util/api";
import { useSelector } from "react-redux";

export default function TableComponent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getUserFragmentsExpanded(user).then((res) => {
      if (typeof res != "undefined") {
        let arr = [];
        for (let i = 0; i < res.fragments.length; i++) {
          let obj = { index: i + 1, ...res.fragments[i] };
          arr.push(obj);
        }
        setData(arr);
      } else {
        setData([
          {
            created: "",
            id: "",
            index: 0,
            ownerId: "",
            size: 0,
            type: "",
            updated: "",
          },
        ]);
      }
    });
  }, [user]);

  const handleViewClick = (id) => {
    navigate(`/fragments/${id}`);
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "text/*": [".txt", ".md", ".html"],
      "application/json": [".json"],
    },
  });

  const fileTypeExtConvert = (fileName) => {
    const extensionToMIME = {
      txt: "text/plain",
      md: "text/markdown",
      html: "text/html",
      json: "application/json",
      png: "image/png",
      jpg: "image/jpeg",
      webp: "image/webp",
      gif: "image/gif",
    };

    return extensionToMIME[fileName] || null;
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const fileName = selectedFile.name;
      const fileExtension = fileName
        .substring(fileName.lastIndexOf(".") + 1)
        .toLowerCase();
      const type = fileTypeExtConvert(fileExtension);

      try {
        await postUserFragments(user, type, selectedFile);
        setSelectedFile(null);
        setOpen(false);
      } catch (error) {
        console.error("Error uploading fragment:", error);
      }
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
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">
              <Button variant="contained" onClick={handleAddClick}>
                Add New
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        {data ? (
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.index}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.created}</TableCell>
                  <TableCell align="right">{row.updated}</TableCell>
                  <TableCell align="right">{row.size}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleViewClick(row.id);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        ) : (
          <div>Loading...</div>
        )}
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
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

import React, { useState, useEffect, useCallback } from "react";
import "./styles.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getFragmentById,
  getFragmentInfoById,
  deleteUserFragments,
  putUserFragments,
} from "../../util/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const Fragment = () => {
  const [data, setData] = useState(null);
  const [dataInfo, setDataInfo] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const [isImage, setIsImage] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchData = useCallback(async () => {
    if (id != null) {
      try {
        const response1 = await getFragmentById(user, id);
        const response2 = await getFragmentInfoById(user, id);
        setData(response1);
        setDataInfo(response2.fragment);
        if (
          response2.fragment.type === "image/png" ||
          response2.fragment.type === "image/jpeg" ||
          response2.fragment.type === "image/webp" ||
          response2.fragment.type === "image/gif"
        ) {
          setIsImage(response1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [id, user]);

  const deleteData = async () => {
    try {
      await deleteUserFragments(user, id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    await deleteData();
    setOpen(false);
    navigate("/");
  };

  const handleEditOpen = (event) => {
    event.preventDefault();
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
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
      jpeg: "image/jpeg",
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
        await putUserFragments(user, id, type, selectedFile);
        setSelectedFile(null);
        setOpenEdit(false);
        fetchData();
      } catch (error) {
        console.error("Error uploading fragment:", error);
      }
    }
  };

  return (
    <div className="fragment-container">
      {data && dataInfo ? (
        <>
          <Card sx={{ width: 900 }}>
            {isImage && (
              <CardMedia
                sx={{ height: 600, objectFit: "cover" }}
                image={URL.createObjectURL(data)}
                title="fragment image"
              />
            )}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Do you want to delete fragment id "${id}"?`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Fragment is unrecoverable after deletion
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Id: {dataInfo.id}
              </Typography>
              {!isImage && <Typography variant="body3">{data}</Typography>}
              <br />
              <br />
              <Typography gutterBottom variant="h6" component="div">
                Fragment Info:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {dataInfo.size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {dataInfo.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created At: {dataInfo.created}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Updated At: {dataInfo.updated}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button variant="contained" size="small" onClick={handleEditOpen}>
                Edit
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red" }}
                size="small"
                onClick={handleDeleteClickOpen}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
          <Modal
            open={openEdit}
            onClose={handleEditClose}
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
                  Update
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleEditClose}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Fragment;

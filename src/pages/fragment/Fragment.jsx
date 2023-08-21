import React, { useState, useEffect, useCallback } from "react";
import "./styles.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import {
  getFragmentById,
  getFragmentInfoById,
  deleteUserFragments,
} from "../../util/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Fragment = () => {
  const [data, setData] = useState(null);
  const [dataInfo, setDataInfo] = useState(null);
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const [isImage, setIsImage] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="fragment-container">
      {data && dataInfo ? (
        <Card sx={{ maxWidth: 900, minWidth: 300 }}>
          {isImage && (
            <CardMedia
              sx={{ height: 600, objectFit: "cover" }}
              image={URL.createObjectURL(data)}
              title="green iguana"
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
              {dataInfo.id}
            </Typography>
            {!isImage && <Typography variant="body3">{data}</Typography>}
            <br />
            <br />
            <Typography gutterBottom variant="h6" component="div">
              Fragment Info:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Owner Id: {dataInfo.ownerId}
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
            <Button variant="contained" size="small">
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Fragment;

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
        setIsImage(typeof response1.data === "string" ? false : true);
        return { response1, response2 };
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
    fetchData().then((res) => {
      setData(res.response1.data);
      setDataInfo(res.response2.fragment);
    });
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
              sx={{ height: 300 }}
              image="/static/images/cards/contemplative-reptile.jpg"
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
            <Typography variant="body3">{data}</Typography>
            <br />
            <br />
            <br />
            <Typography variant="body2" color="text.secondary">
              Owner Id: {dataInfo.ownerId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size: {dataInfo.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {dataInfo.type}
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

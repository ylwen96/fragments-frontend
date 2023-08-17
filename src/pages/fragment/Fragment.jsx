import React, { useState } from "react";
import "./styles.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Fragment = () => {
  return (
    <div className="fragment-container">
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          sx={{ height: 300 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Fragment;

import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button, CardActionArea, CardActions } from "@material-ui/core";
import { unavailable } from "../../config/config";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Modal from "../../components/Modal";

const LINES_TO_SHOW = 2;

// src: https://stackoverflow.com/a/13924997/8062659
const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical",
  },
});

const cardStyle = {
  float: "left",
  transitionDuration: "0.3s",
  width: "30vh",
  height: "55vh",
  maxWidth: "100vh",
  margin: "10px 10px",
};

export default function MultiActionAreaCard({ movieData, mediaType, styles }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card style={cardStyle} onClick={openModal}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            //   image={`https://image.tmdb.org/t/p/original${poster}`}
            image={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
                : unavailable
            }
            alt="green iguana"
            //   sx={{ height: "20px", width: "10px" }}
          />
          <CardContent>
            <Typography
              className={classes.multiLineEllipsis}
              gutterBottom
              variant="h6"
              component="div"
            >
              {movieData.title == undefined ? movieData.name : movieData.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {movieData.release_date == undefined
                ? movieData.first_air_date
                : movieData.release_date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {open && (
        <Modal
          data={movieData}
          mediaType={mediaType}
          show={open}
          handleClose={handleClose}
        ></Modal>
      )}
    </>
  );
}

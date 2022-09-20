import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";
import { unavailable } from "../../config/config";
import { makeStyles } from "@material-ui/core/styles";

const LINES_TO_SHOW = 2;
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

export default function CastCard({ castData, styles }) {
  const classes = useStyles();
  return (
    <>
      <Card style={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={
              castData.profile_path
                ? `https://image.tmdb.org/t/p/original${castData.profile_path}`
                : unavailable
            }
            alt="green iguana"
          />
          <CardContent>
            <Typography
              className={classes.multiLineEllipsis}
              gutterBottom
              variant="h6"
              component="div"
            >
              {castData.name}
            </Typography>

            <Typography
              className={classes.multiLineEllipsis}
              gutterBottom
              variant="h6"
              component="div"
            >
              {castData.character}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

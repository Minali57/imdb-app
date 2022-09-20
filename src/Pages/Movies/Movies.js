import { React, useEffect, useState } from "react";
import axios from "axios";
import MultiActionAreaCard from "./Card";
import CustomPagination from "../../components/CustomPagination";
import ClipLoader from "react-spinners/ClipLoader";
import { createTheme, ThemeProvider, Grid } from "@material-ui/core";

import Filter from "../../components/Filter/Filter";
import { Sort } from "@material-ui/icons";
const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});
const override: CSSProperties = {
  display: "block",
  margin: "auto auto",
  borderColor: "#39445a",
  position: "absolute",
  left: "45%",
  top: "45%",
};
const Movies = () => {
  const [movieData, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [order, setOrder] = useState("2");
  const [sort, setSort] = useState("1");
  const getMovies = async () => {
    var sortby = "popularity";
    var orderby = "asc";

    if (order == "2") {
      orderby = "desc";
    }

    if (sort == "2") {
      sortby = "release_date";
    }

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=09de391eae6c8f459f425d500a26201f&page=${page}&include_adult=false&sort_by=${sortby}.${orderby}`,
    };

    await axios
      .request(options)
      .then(function (response) {
        setMovie(response.data.results);
        setNumOfPages(response.data.total_pages);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, order, sort]);

  return (
    <div>
      <ClipLoader loading={loading} cssOverride={override} size={50} />
      <Grid container>
        <Grid item xs={9}>
          {!loading &&
            movieData.map((mov) => {
              return (
                <>
                  <ThemeProvider theme={darkTheme}>
                    <MultiActionAreaCard movieData={mov} mediaType="movie" />
                  </ThemeProvider>
                </>
              );
            })}
        </Grid>
        <Grid item>
          <Filter setSort={setSort} setOrder={setOrder} />
        </Grid>
      </Grid>

      {!loading && numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;

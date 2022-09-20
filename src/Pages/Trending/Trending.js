import { React, useEffect, useState } from "react";
import axios from "axios";
import MultiActionAreaCard from "../Movies/Card";
import CustomPagination from "../../components/CustomPagination";
import ClipLoader from "react-spinners/ClipLoader";
import { createTheme, ThemeProvider } from "@material-ui/core";

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
const Trending = () => {
  const [content, setContent] = useState([]);
  let [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const getMovies = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/trending/all/day?api_key=09de391eae6c8f459f425d500a26201f&page=${page}`,
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data.results);
        // setMovie(response.data.results[0].title);
        setContent(response.data.results);
        setNumOfPages(response.data.total_pages);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    window.scroll(0, 0);
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <ClipLoader loading={loading} cssOverride={override} size={50} />
      {content.map((mov) => {
        return (
          <>
            {/* <h1> {mov.title} </h1>
            <p>{mov.release_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/original${mov.poster_path}`}
            /> */}
            <ThemeProvider theme={darkTheme}>
              <MultiActionAreaCard movieData={mov} mediaType={mov.media_type} />
            </ThemeProvider>
          </>
        );
      })}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Trending;

import { React, useState, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { IconButton, MenuItem, FormGroup } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { SearchOutlined } from "@material-ui/icons";
import MultiActionAreaCard from "../Movies/Card";
import { createTheme, ThemeProvider } from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";

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

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("1");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchSearch();
    }
  };
  const fetchSearch = () => {
    if (searchText == "") {
      setSearch([]);
    } else {
      setLoading(true);
      var url = "https://api.themoviedb.org/3/search/";
      if (searchType == "1") {
        url = url + "multi";
      } else if (searchType == "2") {
        url = url + "movie";
      } else {
        url = url + "tv";
      }
      const options = {
        method: "GET",
        //  url: "https://api.themoviedb.org/3/discover/movie?api_key=09de391eae6c8f459f425d500a26201f",
        url: `${url}?api_key=09de391eae6c8f459f425d500a26201f&query=${searchText}&language=en-US&include_adult=false`,
      };

      axios
        .request(options)
        .then(function (response) {
          setSearch(response.data.results);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <FormGroup>
        <TextField
          fullWidth
          id="standard-bare"
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchOutlined onClick={fetchSearch} />
              </IconButton>
            ),
            startAdornment: (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={1}
                // value={age}
                label="Age"
                style={{ marginLeft: "-15px", marginRight: "10px" }}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <MenuItem value={1} selected={true}>
                  All
                </MenuItem>
                <MenuItem value={2}>Movies</MenuItem>
                <MenuItem value={3}>Series</MenuItem>
              </Select>
            ),
          }}
        />
      </FormGroup>
      <ClipLoader loading={loading} cssOverride={override} size={50} />
      {!loading &&
        search &&
        search.length > 0 &&
        search.map((val) => {
          if (val.media_type == "tv" || val.media_type == "movie") {
            return (
              <ThemeProvider theme={darkTheme}>
                <MultiActionAreaCard
                  movieData={val}
                  mediaType={val.media_type}
                />
              </ThemeProvider>
            );
          }
        })}
    </>
  );
}

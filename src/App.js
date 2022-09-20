import "./App.css";
import Header from "./components/Header/Header";
import BottomNavigationbar from "./components/MainNav";
import { Container } from "@material-ui/core";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import Trending from "./Pages/Trending/Trending";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
// import Modal from "./components/Modal";
import MovieDetail from "./Pages/movieDetail/MovieDetail";

function App() {
  return (
    <>
      <Header />
      {/* <MovieDetail /> */}

      <Container style={{ padding: "118px 0px" }}>
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Container>
      <BottomNavigationbar />
    </>
  );
}

export default App;

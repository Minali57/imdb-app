import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import CastCard from "../../components/CastCard/CastCard";
import { unavailable } from "../../config/config";
const MovieDetail = ({ id, mediaType }) => {
  const [currentMovieDetail, setMovie] = useState();
  const [movieCast, setCast] = useState();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=09de391eae6c8f459f425d500a26201f&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setCast(data));
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=09de391eae6c8f459f425d500a26201f&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={
            currentMovieDetail && currentMovieDetail.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`
              : unavailable
          }
          alt="bacdrop"
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={
                currentMovieDetail && currentMovieDetail.poster_path
                  ? `https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`
                  : unavailable
              }
              alt="poster"
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail
                ? currentMovieDetail.title == undefined
                  ? currentMovieDetail.name
                  : currentMovieDetail.title
                : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail
                ? currentMovieDetail.vote_average + "/10"
                : ""}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            {currentMovieDetail && currentMovieDetail.number_of_episodes && (
              <div className="movie__runtime">
                {currentMovieDetail.number_of_episodes + " episodes"}
              </div>
            )}
            {currentMovieDetail && currentMovieDetail.number_of_seasons && (
              <div className="movie__runtime">
                {currentMovieDetail.number_of_seasons + " seasons"}
              </div>
            )}
            <div className="movie__runtime">
              {currentMovieDetail
                ? (currentMovieDetail.runtime == undefined
                    ? currentMovieDetail.episode_run_time
                    : currentMovieDetail.runtime) + " mins"
                : " "}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " +
                  (currentMovieDetail.release_date == undefined
                    ? currentMovieDetail.first_air_date
                    : currentMovieDetail.release_date)
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div>
        {movieCast &&
          movieCast.cast &&
          movieCast.cast.map((castData) => (
            <CastCard castData={castData}></CastCard>
          ))}
      </div>
      {/* <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div> */}
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    alt="productionCompanyImage"
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;

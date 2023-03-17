import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [moviename, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then((response) => {
      setMovieList(response.data);
    });
  });

  const submitReview = async (e) => {
    Axios.post("http://localhost:5000/api/insert", {
      movieName: moviename,
      movieReview: review,
    }).then(() => {
      alert("Sucessful insert");
    });
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <form className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review: </label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></input>

        <button onClick={submitReview}>Submit</button>
      </form>

      {/* {movieList.map((val) => {
        return (<h1> MovieName: {val.movieName} || MovieReview : {val.movieReview}</h1>);
      })} */}

    </div>
    
  );
}

export default App;

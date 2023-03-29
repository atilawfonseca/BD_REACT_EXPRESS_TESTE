import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [moviename, setMovieName] = useState("");
  const [review, setReview] = useState("");
  //se for trabalhar com um array precisa adicionar esse [] para funcionar o map
  const [movieList, setMovieList] = useState([]);


//onde estou https://www.youtube.com/watch?v=_S2GKnFpdtE

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then((response) => {
      setMovieList(response.data);
  
    });
  },[]);

  

  const submitReview = async (e) => {
    Axios.post("http://localhost:5000/api/insert", { 
      movieName: moviename,
      movieReview: review,
    }).then(() => {
      alert("Sucessful insert");
    });
    
    setMovieList([
      ...movieList, {movieName: moviename , movieReview: review }
    ]);
  };

 
  const deleteMovie = async (movie) => {
    Axios.delete(`http://localhost:5000/api/delete/${movie}`)
  }

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

      {
        movieList.map((item) => {
          return (
          <div key={item.id}  className="card">
            <h1> {item.movieName}</h1>
            <p>{item.movieReview}</p>

            <button onClick={() => {deleteMovie(item.movieName)}} >Delete</button>
            <input type="text" id="updateInput" />
            <button>Update</button>

            </div>
            )
        })
      }
    

    </div>
    
  );
}

export default App;

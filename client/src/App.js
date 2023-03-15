import './App.css';

function App() {
  return (
    <div className="App">

      <h1>CRUD APPLICATION</h1>
      <form className='form'>
        <label>Movie Name:</label>
        <input type="text" name="movieName"></input>
        <label>Review: </label>
        <input type="text" name="review" ></input>

        <button>Submit</button>

      </form>
      
    </div>
  );
}

export default App;

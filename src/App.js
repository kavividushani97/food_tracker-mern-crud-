import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [daysAte, setDaysAte] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newfname, setNewfname] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/read").then((respose) => {
      setFoodList(respose.data);
    });
  }, []);

  const add = () => {
    axios.post("http://localhost:3001/insert", {
      foodName,
      daysAte,
    });
    //console.log(foodName);
  };

  const update = (id) => {
    axios.put("http://localhost:3001/update", {
      id: id,
      newfname: newfname,
    });
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  };
  return (
    <div className="App">
      <h1>Crud App with Mern</h1>
      <label>Food Name:</label>
      <input
        type="text"
        placeholder="name"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <label>Days Since Ate:</label>
      <input
        type="number"
        placeholder="days"
        onChange={(event) => {
          setDaysAte(event.target.value);
        }}
      />
      <button onClick={add}>Add</button>
      <h2>Food List</h2>
      {foodList.map((val, key) => {
        return (
          <div key={key} className="food">
            <h3>{val.foodName}</h3>
            <h3>{val.daysSinceIAte}</h3>
            <input
              type="text"
              placeholder="food name"
              onChange={(event) => {
                setNewfname(event.target.value);
              }}
            />
            <button onClick={() => update(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
      ;
    </div>
  );
}

export default App;

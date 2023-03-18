import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Arvid from "./app/Arvid";
import { reducerFuntion } from "./features/counterSlice";
import "./App.css";

function SendDataFromThisComponent() {
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({
    name: "",
    age: "",
    city: "",
  });

  return (
    <div>
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="">Age</label>
        <input
          type="number"
          onChange={(e) => setFormdata({ ...formdata, age: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="">City</label>
        <input
          type="text"
          onChange={(e) => setFormdata({ ...formdata, city: e.target.value })}
        />
      </div>
      <button onClick={() => dispatch(reducerFuntion(formdata))}>Add</button>
      <Arvid />
    </div>
  );
}

export default SendDataFromThisComponent;

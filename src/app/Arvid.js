import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { geetingFunction } from "../features/arvidSlicer";
import "./arvid.css";

function Arvid() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const arvidState = useSelector((state) => state.arvid);
  const [newinputvalue, setNewinputvalue] = useState(arvidState.todo);

  useEffect(() => {
    setNewinputvalue(arvidState.todo);
  }, [arvidState.todo]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue !== "") {
      dispatch(geetingFunction([...newinputvalue, inputValue]));
      setInputValue("");
    }
  };
  const handleEditTask = (index) => {
    const newTask = prompt("Enter new task:");
    if (newTask !== null && newTask !== "") {
      const updatedTasks = [...newinputvalue];
      updatedTasks[index] = newTask;
      dispatch(geetingFunction(updatedTasks));
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...newinputvalue];
    updatedTasks.splice(index, 1);
    dispatch(geetingFunction(updatedTasks));
  };

  return (
    <div className="Arvid-container">
      <h1 className="Arvid-title">To-Do List</h1>
      <div>
        <input
          className="Arvid-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="Arvid-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul className="Arvid-list">
        {newinputvalue.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <button onClick={() => handleEditTask(index)}>Edit</button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Arvid;

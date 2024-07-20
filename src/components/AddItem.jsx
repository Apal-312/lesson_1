import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/todoSlice";

const AddItem = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addItem(todoTitle));
    setTodoTitle("");
  };
  return (
    <div>
      <div className="container">
        <h1>Todo app</h1>
        <div className="input-field">
          <input
            value={todoTitle}
            type="text"
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <button onClick={handleClick}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;

// dispatch - посредник, чтобы сработала функция
// dispatch - говорит какую функцию запустить
// action -  функция

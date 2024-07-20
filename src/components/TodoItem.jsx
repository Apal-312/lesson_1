import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  deleteTodo,
  editTodo,
  ediItem,
  editItem,
} from "../store/todoSlice";

const TodoItem = ({ id, title }) => {
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(editItem({ id, newTitle }));
    setEditId(null);
  };
  return (
    <div>
      {editId === id ? (
        <div>
          {" "}
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            value={newTitle}
          />
        </div>
      ) : (
        <p>{title}</p>
      )}
      {editId === id ? (
        <div>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <button onClick={() => dispatch(deleteItem(id))}>Delete</button>
          <button onClick={() => setEditId(id)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;

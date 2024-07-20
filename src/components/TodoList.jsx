import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { getTodos } from "../store/todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, []);
  console.log(todos);
  return (
    <div>
      {todos.map((elem) => (
        <TodoItem key={elem.id} {...elem} />
      ))}
    </div>
  );
};

export default TodoList;
// ...elem - разворачивает все объекты
// useSelector - вытаскивае все состояния
// todos - принимает 2 ключа:  1 - ключ; 2- объект

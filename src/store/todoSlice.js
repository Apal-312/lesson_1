import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../helpers/const";
import axios from "axios";

export const addItem = createAsyncThunk(
  "todos/addItem",
  async (todo, { dispatch }) => {
    try {
      const newTodo = {
        title: todo,
        status: null,
        error: null,
      };
      await axios.post(API, newTodo);
      dispatch(getTodos());
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const { data } = await axios(API);
  return data;
});

export const deleteItem = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${API}/${id}`);
      dispatch(getTodos());
    } catch (error) {
      console.log(error);
    }
  }
);

export const editItem = createAsyncThunk(
  "todos/editItem",
  async ({ id, newTitle }, { dispatch }) => {
    // Added { dispatch } here
    try {
      const newEditedTodo = {
        title: newTitle,
      };
      await axios.patch(`${API}/${id}`, newEditedTodo);
      dispatch(getTodos());
    } catch (error) {
      console.log(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: "idle", // Initial status state
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: Date.now(),
        title: action.payload,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((elem) => elem.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo(state, action) {
      const { id, newTitle } = action.payload;
      const editedTodo = state.todos.find((elem) => elem.id === id); // Fixed comparison operator
      if (editedTodo) {
        editedTodo.title = newTitle;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;

// принимает Init state - 1) назвать slice
//  createSlice принимает всегда объект
// reducer отвечает за добавление корзинок
// todos addTodo() есть 2 параметра 1) state и 2) action
// state.todos = state.todos - перезаписываем
//? useSelector - вытаскивает только состояние
// ?  extraReducers - будет запускать определенные действия. Они отвечают за асихронные
// todos createAsyncThunk примает 2 аргумента  1)название (к какому именно состояние привязать функцию,) 2) сама функция
//!  у promise есть 3 состояние 1)ожидание (pending): начальное состояние, не исполнен и не отклонён. исполнено (fulfilled): операция завершена успешно. отклонено (rejected): операция завершена с ошибкой.

// принимает 2 параметра -  куда отправить и что отправит
// ? позволяет сделать запрос на сервер. Принимает2 пармаетра 1) к какому массиву состоянию привязать функцию,  2) сама асинхронна функция

//action -  лежит объект
// editTodo - принмает state, action
//  extraReducers - запускает определенные функции

// redux, redux toolkit  - проходили

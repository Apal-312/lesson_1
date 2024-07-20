import { createAsyncThunk } from "@reduxjs/toolkit";
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
  async ({ id, newTitle }) => {
    try {
      const newdEditedTodo = {
        title: newTitle,
      };
      await axios.patch(`${API}/${id}`, newdEditedTodo);
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
      const editedTodo = state.todos.find((elem) => elem.id == id);
      editedTodo.title = newTitle;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "загрука данных";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "данные успешно загрузились ";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.statuc = "ошибка при загрузке данных";
        state.error = action.error;
      });
  },
});
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

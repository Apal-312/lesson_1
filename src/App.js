import "./App.css";
import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <AddItem />
      <TodoList />
    </div>
  );
}

export default App;

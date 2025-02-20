import { useState } from "react";

import "./TodoApp.css";
import { useEffect } from "react";

// DESAFIOS:
// Salvar itens no localStorage
// carregar eles com useEffect
// deletar itens com uma funcao e evento OK

const TodoApp = () => {
  // lista de tarefas
  const [todos, setTodos] = useState([]);

  // estado de texto da tarefa
  const [inputValue, setInputValue] = useState("");

  // adicionar tarefa
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);

      setInputValue("");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("todos") != null) {
      console.log("UE 1");
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  useEffect(() => {
    if (todos != "") {
      localStorage.removeItem("todos");
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const deleteTask = (e) => {
    const id = e.target.getAttribute("value");
    console.log(id);
    setTodos((prevTodos) => prevTodos.filter((td) => td.id != id));
  };

  return (
    <div className="app-container">
      <h1 className="title">Lista de Tarefas</h1>
      {/* Form para adicionar tarefas */}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="input-field"
          placeholder="Adcione uma tarefa..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="submit" className="add-button">
          Adicionar Tarefa
        </button>
      </form>

      {/* Lista de tarefas */}
      {todos.length === 0 && <p className="empty">Não há tarefas</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <button
              value={todo.id}
              className="delete-button"
              onClick={deleteTask}
            >
              Excluir tarefa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

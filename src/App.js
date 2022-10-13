import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import "./App.css";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  /*
    SE CREA LA FUNCION EN EL COMPONENTE PADRE
    1. ESTA SE LLAMA EN EL COMPONENTE HIJO Y SE MANDA COMO UNA PROP EN FORMA DE FUNCION
  */
  const toggleTaskCompleted = (id) => {
    const updateTask = tasks.map((task) => {
      if (id === task.id) {
        //CREANDO NUEVO OBJETO DE TASKS Y RETORNANDOLO CON LA PROPIEDAD COMPLETED CAMBIADA
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTask);
  };

  /* FUNCION PARA ELIMINAR TAREAS, ENVIADA DESDE EL COMPOENENTE PADRE COMO PROP AL COMPONENTE HIJO*/
  const deleteTask = (id) => {
    const remainingTask = tasks.filter((task) => {
      return id !== task.id;
    });
    setTasks(remainingTask);
  };

  const editTask = (id, newName) => {
    const editTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editTaskList);
  };

  /* 
    CREACION CADA UNA DE LAS TAREAS UTILIZANDO UN COMPONENTE, EN EL CUAL SE ENVIAN TODAS LAS PROPS NECESARIAS
    1. SE UTILIZA .MAP() PARA ITERAR EN JSX, ESTE CODIGO RETORNA UN FRAGMENTO JSX QUE SE UTILIZARA LUEGO
  */
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  /*
    CREACION DE UNA TAREA
  */
  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
    setFilter("All");
  };

  /*
    CODIGO DE MENSAJE DE CUANTAS TAREAS EXISTEN
  */
  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

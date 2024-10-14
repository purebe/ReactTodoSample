import { useState, useEffect } from 'react';
import Tasks from './Tasks.json';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';

export function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [maxTaskId, setMaxTaskId] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks !== null) {
      setTasks(JSON.parse(localTasks));
    } else {
      setTasks(Tasks);
    }
    
    const localMaxTaskId = localStorage.getItem("maxTaskId");
    if (localMaxTaskId !== null) {
      setMaxTaskId(Number.parseInt(localMaxTaskId));
    } else {
      setMaxTaskId(2);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("maxTaskId", maxTaskId);
    }
  }, [tasks, isLoaded]);

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: maxTaskId + 1, text: 'New Task', 'done': false }
    ]);
    setMaxTaskId(maxTaskId + 1);
  };

  return (
    <>
      {tasks.map(task => {
        const deleteTask = () => {
          const newTasks = tasks
            .filter(t => t.id !== task.id);
          setTasks(newTasks);
        };
        return (
          <TodoItem
            task={task}
            key={task.id}
            deleteTask={deleteTask}
          />
        );
      })}
      <AddTodo addTask={addTask} />
    </>
  );
}
